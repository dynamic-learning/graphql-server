export const UserTypes = `
  type User {
    _id: ID!
    email: String!
    password: String
  }

  input UserInput {
    email: String!
    password: String!
  }
`

export default UserTypes