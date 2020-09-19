import { ApolloServer } from "apollo-server";
import Mutation from "./graphql/mutation";
import Query from "./graphql/query";
import typeDefs from "./graphql/type-defs";
import connectToMongoose from "./service/mongoose";

const resolvers = {
  Query,
  Mutation,
};

export const createApolloServer = () => {
  return new ApolloServer({
    cors: { origin: "*", credentials: true },
    typeDefs,
    resolvers,
  });
}

let server = createApolloServer();

const runServer = async () => {
  await connectToMongoose();
  const res = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀  Server ready at ${res.url}`);
};

if(process.env.NODE_ENV !== 'test') {
  runServer();
}

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception");
  console.log(err);
});
