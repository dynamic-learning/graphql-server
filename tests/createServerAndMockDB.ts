const { createTestClient } = require("apollo-server-testing");
import { createApolloServer } from "../src/index";
import mongoose from "mongoose";

let server;

const createServerAndMockDB = async (mongoMemeryServer) => {
  const uri = await mongoMemeryServer.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);

  server = createApolloServer();
  return createTestClient(server);
};

export default createServerAndMockDB;
