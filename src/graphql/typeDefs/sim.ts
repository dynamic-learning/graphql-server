export const SimTypes = `
  type Sim {
    _id: ID!
    owner: String!
    title: String!
    description: String
    tags: [String!]
    imageURL: String
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

  type DeleteReturnType {
    success: Boolean!
  }
`

export default SimTypes;