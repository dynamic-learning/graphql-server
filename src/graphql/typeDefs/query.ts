const QueryTypes  = `
    type Query {
        workbook(workbookId: ID!): Workbook
        workbookViewer(owner: ID!): [WorkbookViewerItem!]!
        sims(keyword: String!): [Sim!]!
    }
`

export default QueryTypes