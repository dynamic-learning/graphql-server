import { gql } from "apollo-server";

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

  type Sim {
    _id: ID!
    owner: String!
    title: String!
    description: String
    tags: [String!]
    imageURL: String
  }

  type Query {
    workbook(workbookId: ID!): Workbook
    workbookViewer(owner: ID!): [WorkbookViewerItem!]!
    sims(keyword: String!): [Sim!]!
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

  type DeleteReturnType {
    success: Boolean!
  }


  input SimInput {
    _id: ID!
    owner: String!
    title: String!
    description: String
    tags: [String!]
    imageURL: String
  }

  input SimEditableFields {
    title: String!
    description: String
    tags: [String!]
    imageURL: String
  }


  type Mutation {
    createWorkbook(workbook: WorkbookInput): Workbook
    updateWorkbook(workbookId: ID!, field: String!, value: String): Workbook
    deleteWorkbook(workbookId: ID!): DeleteReturnType

    createWorkbookFolder(workbookFolder: WorkbookFolderInput): WorkbookFolder
    updateWorkbookFolder(
      workbookFolderId: ID!
      field: String!
      value: String
    ): WorkbookFolder
    deleteWorkbookFolder(workbookFolderId: ID!): DeleteReturnType

    createSim(sim: SimInput): Sim
    updateSim(simId: ID!, updatedSim: SimEditableFields): Sim
    deleteSim(simId: ID!): DeleteReturnType
  }
`;

export default typeDefs;
