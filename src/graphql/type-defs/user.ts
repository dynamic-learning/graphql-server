const userType = `
    type User {
        _id: ID!
        email: String!
        password: String
        type: String!
        username: String!
    }

    input UserInput {
        email: String!
        password: String!
        username: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        type: String!
        username: String!
        email:String!
    }
`;
export default userType;
