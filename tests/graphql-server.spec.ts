import { createApolloServer } from "../src/index";
import mongoose from "mongoose";
const { createTestClient } = require("apollo-server-testing");
const { MongoMemoryServer } = require("mongodb-memory-server");
import { GET_WORKBOOKS, GET_WORKBOOK } from "./query";
import {
  ADD_WORKBOOK,
  ADD_FOLDER,
  UPDATE_WORKBOOK,
  UPDATE_WORKBOOK_FOLDER,
  DELETE_WORKBOOK,
  DELETE_WORKBOOK_FOLDER
} from "./mutation";

const mongod = new MongoMemoryServer();
let server, query, mutate;

process.env.NODE_ENV = "test";

beforeAll(async () => {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);

  server = createApolloServer();
  let res = createTestClient(server);

  query = res.query;
  mutate = res.mutate;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

describe("Workbooks test", () => {
  let addedWorkbook, addedFolder;

  it("adds a workbook", async () => {
    let res = await mutate({
      mutation: ADD_WORKBOOK,
    });
    addedWorkbook = res.data.createWorkbook;
    expect(addedWorkbook.title).toBe("History");
  });

  it("adds a workbook folder", async () => {
    let res = await mutate({
      mutation: ADD_FOLDER,
    });
    addedFolder = res.data.createWorkbookFolder;
    expect(addedFolder.title).toBe("Social Science");
  });

  it("retrieves the added workbook", async () => {
    let res = await query({
      query: GET_WORKBOOK(addedWorkbook._id),
    });
    expect(res.data.workbook._id).toBe(addedWorkbook._id);
  });

  it("gets the list of added workbooks", async () => {
    let res = await query({
      query: GET_WORKBOOKS,
    });
    expect(res.data.workbookViewer.length).toBe(2);
  });

  it("changes parentId of the added workbook", async () => {
    let res = await query({
      query: UPDATE_WORKBOOK({
        id: addedWorkbook._id,
        field: "parentId",
        value: addedFolder._id,
      }),
    });
    expect(res.data.updateWorkbook.parentId).toBe(addedFolder._id);
  });

  it("changes title of the added workbook folder", async () => {
    let res = await query({
      query: UPDATE_WORKBOOK_FOLDER({
        id: addedFolder._id,
        field: "title",
        value: "newTitle",
      }),
    });
    expect(res.data.updateWorkbookFolder.title).toBe("newTitle");
  });

  it('deletes a workbook', async () => {
    let res = await mutate({
      mutation: DELETE_WORKBOOK(addedWorkbook._id)
    })
    expect(res.data.deleteWorkbook.success).toBe(true)
  })

  it('deletes a workbook folder', async () => {
    let res = await mutate({
      mutation: DELETE_WORKBOOK_FOLDER(addedFolder._id)
    })
    expect(res.data.deleteWorkbookFolder.success).toBe(true)
  })
});
