const queryType = `
    type Query {
        workbook(workbookId: ID!): Workbook
        workbookViewer: [WorkbookViewerItem!]!
        sims(keyword: String!): [Sim!]!
        login(email: String!, password: String!): AuthData!
        currentUser: User
    }
`;

export default queryType;
