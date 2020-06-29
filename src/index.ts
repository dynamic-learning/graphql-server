import { ApolloServer } from "apollo-server";
import Mutation from "./graphql/mutation";
import Query from "./graphql/query";
import typeDefs from "./graphql/type-defs";
import connectToMongoose from "./service/mongoose";

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  cors: { origin: "*", credentials: true },
  typeDefs,
  resolvers,
});

const runServer = async () => {
  await connectToMongoose();
  const res = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀  Server ready at ${res.url}`);
};

runServer();

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception");
  console.log(err);
});
