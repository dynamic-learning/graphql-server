import mongoose from "mongoose";
import { createTestClient } from "apollo-server-testing";

import * as queries from "./queries";
import * as mutations from "./mutations";

import createMockServer from "./utils/createMockServer";
import createMockDB from "./utils/createMockDB";

let query, mutate, mockServer, mockDB;

beforeAll(async () => {
  mockDB = await createMockDB();
  mockServer = createMockServer();
  const testClient = createTestClient(mockServer);
  query = testClient.query;
  mutate = testClient.mutate;
  process.env.AUTH_KEY = "secret_key";
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mockDB.stop();
});

describe("Workbooks test", () => {
  let addedWorkbook, addedFolder, userId;

  it("creates a new user", async () => {
    let res = await mutate({
      mutation: mutations.ADD_USER("test", "test@test.com", "test"),
    });
    expect(res.data.createUser.email).toEqual("test@test.com");
    expect(res.data.createUser.username).toEqual("test");
    expect(res.data.createUser.type).toEqual("normal");
  });

  it("gives token if valid credentials provided", async () => {
    let res = await query({
      query: queries.LOGIN("test@test.com", "test"),
    });
    userId = res.data.login.userId;
    expect(res.data.login.token.length).toBeGreaterThan(100);
    expect(res.data.login.userId.length).toEqual(24);
    expect(res.data.login.tokenExpiration).toEqual(1);
  });

  it("does not give token if invalid credentials provided", async () => {
    let res = await query({
      query: queries.LOGIN("test@test.com", "wrong"),
    });
    expect(res.data).toBeFalsy();
  });

  it("adds a workbook", async () => {
    setUserInContext(userId);
    let res = await mutate({
      mutation: mutations.ADD_WORKBOOK,
    });
    addedWorkbook = res.data.createWorkbook;
    expect(addedWorkbook.title).toBe("History");
  });

  it("will not allow to add workbook if not authenticated", async () => {
    setUserAsNullInContext();
    let res = await mutate({
      mutation: mutations.ADD_WORKBOOK,
    });
    expect(res.errors).toBeTruthy();
  });

  it("adds a workbook folder", async () => {
    setUserInContext(userId);
    let res = await mutate({
      mutation: mutations.ADD_FOLDER,
    });
    addedFolder = res.data.createWorkbookFolder;
    expect(addedFolder.title).toBe("Social Science");
  });

  it("will not allow to add workbook folder if not authenticated", async () => {
    setUserAsNullInContext();
    let res = await mutate({
      mutation: mutations.ADD_FOLDER,
    });
    expect(res.errors).toBeTruthy();
  });

  it("retrieves the added workbook", async () => {
    setUserInContext(userId);
    let res = await query({
      query: queries.GET_WORKBOOK(addedWorkbook._id),
    });
    expect(res.data.workbook._id).toBe(addedWorkbook._id);
  });

  it("gets the list of added workbooks", async () => {
    setUserInContext(userId);
    let res = await query({
      query: queries.GET_WORKBOOKS,
    });
    expect(res.data.workbookViewer.length).toBe(2);
  });

  it("will not allow to get the list of workbooks if not authenticated", async () => {
    setUserAsNullInContext();
    let res = await query({
      query: queries.GET_WORKBOOKS,
    });
    expect(res.errors).toBeTruthy();
  });

  it("changes parentId of the added workbook", async () => {
    setUserInContext(userId);
    let res = await query({
      query: mutations.UPDATE_WORKBOOK({
        id: addedWorkbook._id,
        field: "parentId",
        value: addedFolder._id,
      }),
    });
    expect(res.data.updateWorkbook.parentId).toBe(addedFolder._id);
  });

  it("will not allow to change the field of a workbook if the user is now the owner", async () => {
    setUserInContext("user_who_is_not_owner");
    let res = await query({
      query: mutations.UPDATE_WORKBOOK({
        id: addedWorkbook._id,
        field: "title",
        value: "new_title",
      }),
    });
    expect(res.errors).toBeTruthy();
  });

  it("changes title of the added workbook folder", async () => {
    setUserInContext(userId);
    let res = await query({
      query: mutations.UPDATE_WORKBOOK_FOLDER({
        id: addedFolder._id,
        field: "title",
        value: "newTitle",
      }),
    });
    expect(res.data.updateWorkbookFolder.title).toBe("newTitle");
  });

  it("deletes a workbook", async () => {
    setUserInContext(userId);
    let res = await mutate({
      mutation: mutations.DELETE_WORKBOOK(addedWorkbook._id),
    });
    expect(res.data.deleteWorkbook.success).toBe(true);
  });

  it("will not allow to delete a workbook if the user is not the owner", async () => {
    setUserInContext("user_who_is_not_owner");
    let res = await mutate({
      mutation: mutations.DELETE_WORKBOOK(addedWorkbook._id),
    });
    expect(res.errors).toBeTruthy();
  });

  it("deletes a workbook folder", async () => {
    setUserInContext(userId);
    let res = await mutate({
      mutation: mutations.DELETE_WORKBOOK_FOLDER(addedFolder._id),
    });
    expect(res.data.deleteWorkbookFolder.success).toBe(true);
  });

  it("will not allow to delete a workbook folder if the user is not the owner", async () => {
    setUserInContext("user_who_is_not_owner");
    let res = await mutate({
      mutation: mutations.DELETE_WORKBOOK_FOLDER(addedFolder._id),
    });
    expect(res.errors).toBeTruthy();
  });
});

const setUserInContext = (userId = "", type = "normal") => {
  mockServer.context = {
    user: {
      userId,
      type,
    },
  };
};

const setUserAsNullInContext = () => {
  mockServer.context = {
    user: null,
  };
};
