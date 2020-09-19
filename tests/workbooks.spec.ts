import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as queries from "./queries";
import * as mutations from "./mutations";
import createServerAndMockDB from './createServerAndMockDB';

const mongoMemeryServer = new MongoMemoryServer();
process.env.NODE_ENV = "test";
let query, mutate;

beforeAll(async ()=>{
  const res = await createServerAndMockDB(mongoMemeryServer);
  query = res.query
  mutate = res.mutate;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoMemeryServer.stop();
});

describe("Workbooks test", () => {
  let addedWorkbook, addedFolder;

  it("adds a workbook", async () => {
    let res = await mutate({
      mutation: mutations.ADD_WORKBOOK,
    });
    addedWorkbook = res.data.createWorkbook;
    expect(addedWorkbook.title).toBe("History");
  });

  it("adds a workbook folder", async () => {
    let res = await mutate({
      mutation: mutations.ADD_FOLDER,
    });
    addedFolder = res.data.createWorkbookFolder;
    expect(addedFolder.title).toBe("Social Science");
  });

  it("retrieves the added workbook", async () => {
    let res = await query({
      query: queries.GET_WORKBOOK(addedWorkbook._id),
    });
    expect(res.data.workbook._id).toBe(addedWorkbook._id);
  });

  it("gets the list of added workbooks", async () => {
    let res = await query({
      query: queries.GET_WORKBOOKS,
    });
    expect(res.data.workbookViewer.length).toBe(2);
  });

  it("changes parentId of the added workbook", async () => {
    let res = await query({
      query: mutations.UPDATE_WORKBOOK({
        id: addedWorkbook._id,
        field: "parentId",
        value: addedFolder._id,
      }),
    });
    expect(res.data.updateWorkbook.parentId).toBe(addedFolder._id);
  });

  it("changes title of the added workbook folder", async () => {
    let res = await query({
      query: mutations.UPDATE_WORKBOOK_FOLDER({
        id: addedFolder._id,
        field: "title",
        value: "newTitle",
      }),
    });
    expect(res.data.updateWorkbookFolder.title).toBe("newTitle");
  });

  it('deletes a workbook', async () => {
    let res = await mutate({
      mutation: mutations.DELETE_WORKBOOK(addedWorkbook._id)
    })
    expect(res.data.deleteWorkbook.success).toBe(true)
  })

  it('deletes a workbook folder', async () => {
    let res = await mutate({
      mutation: mutations.DELETE_WORKBOOK_FOLDER(addedFolder._id)
    })
    expect(res.data.deleteWorkbookFolder.success).toBe(true)
  })
});
