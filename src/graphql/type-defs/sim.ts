const simType = `
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
`;

export default simType;
