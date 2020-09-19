const userType = `
    type User {
        _id: ID!
        email: String!
        password: String
        type: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        type: String!
    }
`;
export default userType;
