const workbookType = `
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
        slides: String!
    }
    
    input WorkbookFolderInput {
        title: String!
    }
`;

export default workbookType;
