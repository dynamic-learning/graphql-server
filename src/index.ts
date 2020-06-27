import { ApolloServer, gql } from 'apollo-server';
import Workbook from './models/workbooks';
import WorkbookFolder from './models/workbookFolders';

const mongoose = require('mongoose');
const typeDefs = gql`
  type Workbook {
    _id: ID!
    title: String!
    owner: ID!
    parentId: ID
    slides: String
  }

  type WorkbookFolder {
    _id: ID!
    title: String!
    owner: ID!
    parentId: ID
  }

  type WorkbookViewerItem {
    _id: ID!
    title: String!
    parentId: String
    type: String
  }

  type Query {
    workbook(workbookId: ID!): Workbook
    workbookViewer(owner: ID!): [WorkbookViewerItem!]!
  }

  input WorkbookInput {
    title: String!
    owner: ID!
    slides: String!
  }  

  input WorkbookFolderInput {
    title: String!
    owner: ID!    
  }

  type Mutation {
    createWorkbook(workbook: WorkbookInput): Workbook
    updateWorkbook(workbookId: ID!, field: String!, value: String!): Workbook

    createWorkbookFolder(workbookFolder: WorkbookFolderInput): WorkbookFolder
    updateWorkbookFolder(workbookFolderId: ID!, field: String!, value: String!): WorkbookFolder
  }
`;

const resolvers = {
  Query: {
      workbook: async (root, args) => {
        const workbook = await Workbook.findById(args.workbookId);
        return workbook;
      },
      workbookViewer: async (root, args) => {
        const filter = {owner: args.owner};
        let workbooks, workbookFolders;
        try {
          workbooks = await Workbook.find(filter).populate('parentId');
          console.log(workbooks);
          workbooks = workbooks.map((workbook) => {
            return ({...workbook._doc, 
                    parentId: workbook.parentId ? workbook.parentId._id : "0",
                    type: "file"
                  });
          });
        } catch (err) {
          console.log(err);
        }
                
        try {
          workbookFolders = await WorkbookFolder.find()//.populate('parentId');
          console.log(workbookFolders);
          workbookFolders = workbookFolders.map((workbookFolder) => {
            return ({...workbookFolder._doc, 
                    parentId: workbookFolder.parentId ? workbookFolder.parentId._id : "0",
                    type: "folder"
                  });
          });   
        } catch (err) {
          console.log(err);
        }
               
        return [...workbooks, ...workbookFolders];
      }
  },
  Mutation: {
    createWorkbook: async (root, args) => {
      try {
        return await Workbook({
          title: args.workbook.title,
          owner: args.workbook.owner,
          slides: args.workbook.slides
        }).save();
      } 
      catch (err) {
        console.log(err);
      }
    },

    updateWorkbook: async (root, args) => {
      const editableFields = ['title', 'slides', 'parentId'];
      if (editableFields.includes(args.field)) {
        const update = {};
        update[args.field] = args.value;  
        try {
          const workbook = await Workbook.findByIdAndUpdate(args.workbookId, update, { 
            new: true, useFindAndModify: false 
          });
          return workbook;
        }
        catch (err) {
          console.log(err);
        }  
      }
      else {       
        throw new Error(`The field ${args.field} is not editable`);
      }
    },

    createWorkbookFolder: async (root, args) => {
      try {
        return WorkbookFolder({
          title: args.workbookFolder.title,
          owner: args.workbookFolder.owner
        }).save();
      } 
      catch (err) {
        console.log(err);
      }
    },

    updateWorkbookFolder: async (root, args) => {
      const editableFields = ['title', 'parentId'];
      if (editableFields.includes(args.field)) {
        const update = {};
        update[args.field] = args.value;  
        try {
          const workbookFolder = await WorkbookFolder.findByIdAndUpdate(args.workbookFolderId, update, { 
            new: true, useFindAndModify: false 
          });
          return workbookFolder;
        }
        catch (err) {
          console.log(err);
        }  
      }
      else {       
        throw new Error(`The field ${args.field} is not editable`);
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
