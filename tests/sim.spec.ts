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
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mockDB.stop();
});

describe("Workbooks test", () => {
  let userId;

  it("creates a new user", async () => {
    let res = await mutate({
      mutation: mutations.ADD_USER("test@test.com", "test"),
    });
    expect(res.data.createUser.email).toEqual("test@test.com");
    expect(res.data.createUser.password).toEqual(null);
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

  it("adds a sim", async () => {
    setUserInContext(userId, "admin");
    let res = await mutate({
      mutation: mutations.ADDSIM(
        "1",
        "sim-1",
        "desc-1",
        ["science", "math"],
        "imgUrl"
      ),
    });
    expect(res.errors).toBeFalsy();
  });

  it("will not allow to add a sim if the user is not the admin", async () => {
    setUserInContext(userId, "normal");
    let res = await mutate({
      mutation: mutations.ADDSIM(
        "2",
        "sim-1",
        "desc-1",
        ["science", "math"],
        "imgUrl"
      ),
    });
    expect(res.errors).toBeTruthy();
  });

  it("will update a sim", async () => {
    setUserInContext(userId, "admin");
    let res = await mutate({
      mutation: mutations.UPDATE_SIM(
        "1",
        "updated-title",
        "desc-2",
        ["science", "math"],
        "imgUrl"
      ),
    });
    expect(res.data.updateSim.title).toEqual("updated-title");
  });

  it("will not updated a sim if user is not admin", async () => {
    setUserInContext(userId, "normal");
    let res = await mutate({
      mutation: mutations.UPDATE_SIM(
        "1",
        "updated-title",
        "desc-2",
        ["science", "math"],
        "imgUrl"
      ),
    });
    expect(res.errors).toBeTruthy();
  });

  it("will delete a sim", async () => {
    setUserInContext(userId, "admin");
    let res = await mutate({
      mutation: mutations.DELETE_SIM("1"),
    });
    expect(res.data.deleteSim.success).toBeTruthy();
  });

  it("will not delete a sim if user is not an admin", async () => {
    setUserInContext(userId, "normal");
    let res = await mutate({
      mutation: mutations.DELETE_SIM("1"),
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
