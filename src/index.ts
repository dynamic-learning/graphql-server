import { ApolloServer, gql } from 'apollo-server';
import Workbook from './models/workbooks';
const mongoose = require('mongoose');
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Workbook {
    _id: ID!
    title: String!
    owner: String!
    type: String!
    parentId: ID
    slides: String
  }
  type Query {
    books: [Book]
    workbooks: [Workbook!]!
  }  
`;

const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];

const resolvers = {
    Query: {
        books: () => books,
        workbooks: () => {
          return Workbook.find()
                    .then((workbooks) => {                        
                        return workbooks;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

console.log(process.env.MONGO_USER);

const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-x1n5v.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(dbUrl).then(() => {
  server.listen({ port: process.env.PORT || 4000 }).then((res) => {
    console.log(`🚀  Server ready at ${res.url}`);
  });
})
.catch((err) => {
    console.log(err);
});
