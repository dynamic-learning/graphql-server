import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoMemeryServer = new MongoMemoryServer();

const createMockDB = async () => {
  const uri = await mongoMemeryServer.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);
  return mongoMemeryServer;
};

export default createMockDB;
