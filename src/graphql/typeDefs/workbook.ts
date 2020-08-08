export const WorkbookTypes = `
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

  input WorkbookInput {
    title: String!
    owner: ID!
    slides: String!
  }

  input WorkbookFolderInput {
    title: String!
    owner: ID!
  }
`

export default WorkbookTypes