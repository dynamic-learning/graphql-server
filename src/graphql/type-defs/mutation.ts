const mutationType = `
    type Mutation {
        createWorkbook(workbook: WorkbookInput): Workbook
        updateWorkbook(workbookId: ID!, field: String!, value: String): Workbook
        deleteWorkbook(workbookId: ID!): DeleteReturnType

        createWorkbookFolder(workbookFolder: WorkbookFolderInput): WorkbookFolder
        updateWorkbookFolder(
        workbookFolderId: ID!
            field: String!
            value: String
        ): WorkbookFolder
        deleteWorkbookFolder(workbookFolderId: ID!): DeleteReturnType

        createSim(sim: SimInput): Sim
        updateSim(simId: ID!, updatedSim: SimEditableFields): Sim
        deleteSim(simId: ID!): DeleteReturnType
            
        createUser(userInput: UserInput): AuthData!
    }
`;

export default mutationType;
