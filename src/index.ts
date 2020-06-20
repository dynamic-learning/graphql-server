import { ApolloServer, gql } from 'apollo-server';
import Workbook from './models/workbooks';
import WorkbookCollection from './models/workbookCollections';

const mongoose = require('mongoose');
const typeDefs = gql`
  type Workbook {
    _id: ID!
    title: String!
    owner: ID!
    parentId: ID
    slides: String
  }

  type WorkbookCollection {
    _id: ID!
    title: String!
    owner: ID!
    parentId: ID
  }

  enum WorkbookViewerItemType {
    WORKBOOK
    COLLECTION
  }

  type WorkbookViewerItem {
    _id: ID!
    title: String!
    parentId: String
    type: WorkbookViewerItemType
  }

  type Query {
    getWorkbook(workbookId: ID!): Workbook
    workbookViewer(owner: ID!): [WorkbookViewerItem!]!
  }

  input WorkbookInput {
    title: String!
    owner: ID!
    slides: String!
  }  

  input WorkbookCollectionInput {
    title: String!
    owner: ID!    
  }

  type Mutation {
    createWorkbook(workbook: WorkbookInput): Workbook
    updateWorkbookTitle(workbookId: ID!, newTitle: String!): Workbook
    updateWorkbookParent(workbookId: ID!, newParentId: ID!): Workbook
    updateWorkbookSlide(workbookId: ID!, newSlides: String!): Workbook

    createWorkbookCollection(workbookCollection: WorkbookCollectionInput): WorkbookCollection
    updateWorkbookCollectionParent(workbookCollectionId: ID!, newParentId: ID!): WorkbookCollection
  }
`;


const resolvers = {
  Query: {
      getWorkbook: async (root, args) => {
        const workbook = await Workbook.findById(args.workbookId);
        return workbook;
      },
      workbookViewer: async (root, args) => {
        const filter = {owner: args.owner};
        let workbooks = await Workbook.find(filter).populate('parentId');
        const workbookCollections = await WorkbookCollection.find(filter).populate('parentId');
        workbooks = workbooks.map((workbook) => {
          return ({...workbook._doc, parentId: workbook.parentId.title});
        });
        console.log(workbooks);
        console.log(workbookCollections);
        return [...workbooks, ...workbookCollections];
      }
  },
  Mutation: {
    createWorkbook: async (root, args) => {
      const workbook = new Workbook({
        title: args.workbook.title,
        owner: args.workbook.owner,
        slides: args.workbook.slides
      });
      try {
        const result = await workbook.save();
        return result;
      } 
      catch (err) {
        console.log(err);
      }
    },

    updateWorkbookTitle: async (root, args) => {
      const _id = args.workbookId;
      const update = { title: args.newTitle};
      const options = { new: true, useFindAndModify: false };
      try {
        const workbook = await Workbook.findByIdAndUpdate(_id, update, options);
        return workbook;
      }
      catch (err) {
        console.log(err);
      }
    },

    updateWorkbookParent: async (root, args) => {
      const _id = args.workbookId;
      const update = { parentId: args.newParentId };
      const options = { new: true, useFindAndModify: false };
      try {
        const workbook = await Workbook.findByIdAndUpdate(_id, update, options);
        return workbook;
      }
      catch (err) {
        console.log(err);
      }
    },

    updateWorkbookSlide: async (root: any, args) => {
      const _id = args.workbookId;
      const update = { title: args.newSlides};
      const options = { new: true, useFindAndModify: false };
      try {
        const workbook = await Workbook.findByIdAndUpdate(_id, update, options);
        return workbook;
      }
      catch (err) {
        console.log(err);
      }
    },

    createWorkbookCollection: async (root, args) => {
      const workbook = new WorkbookCollection({
        title: args.workbookCollection.title,
        owner: args.workbookCollection.owner
      });
      try {
        const result = await workbook.save();
        return result;
      } 
      catch (err) {
        console.log(err);
      }
    },

    updateWorkbookCollectionParent: async (root, args) => {
      const _id = args.workbookCollectionId;
      const update = { parentId: args.newParentId};
      const options = { new: true, useFindAndModify: false };
      try {
        const workbookCollection = await WorkbookCollection.findByIdAndUpdate(_id, update, options);
        return workbookCollection;
      }
      catch (err) {
        console.log(err);
      }
    }
  }
}

const server = new ApolloServer({ cors: { origin: '*', credentials: true}, typeDefs, resolvers });


const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-x1n5v.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(db).then(() => {
  server.listen({ port: process.env.PORT || 4000 }).then((res) => {
    console.log(`🚀  Server ready at ${res.url}`);
  });
})
.catch((err) => {
    console.log(err);
});
