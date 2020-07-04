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

  type Simulation {
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
    simulations(keyword: String!): [Simulation!]!
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


  input SimulationInput {
    _id: ID!
    owner: String!
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

    createSimulation(simulation: SimulationInput): Simulation
    updateSimulation(
      simulationId: ID!
      field: String!
      value: String
    ): Simulation
    updateSimulationTags(
      simulationId: ID!
      tags: [String!]!
    ): Simulation
    deleteSimulation(simulationId: ID!): DeleteReturnType
  }
`;

export default typeDefs;
