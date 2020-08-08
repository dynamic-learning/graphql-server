const QueryTypes  = `
    type Query {
        workbook(workbookId: ID!): Workbook
        workbookViewer(owner: ID!): [WorkbookViewerItem!]!
        sims(keyword: String!): [Sim!]!
        login(email: String!, password: String!): AuthData!
    }
`

export default QueryTypes