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

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
`

export default UserTypes