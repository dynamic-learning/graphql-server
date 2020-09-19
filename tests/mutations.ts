import gql from "graphql-tag";

export const ADD_WORKBOOK = gql`
  mutation {
    createWorkbook(
      workbook: { title: "History", owner: "13jnafso34", slides: "slide" }
    ) {
      _id
      title
      owner
      slides
      parentId
    }
  }
`;

export const ADD_FOLDER = gql`
  mutation {
    createWorkbookFolder(
      workbookFolder: { title: "Social Science", owner: "13jnafso34" }
    ) {
      _id
      title
      owner
      parentId
    }
  }
`;

export const UPDATE_WORKBOOK = ({ id, field, value }) => {

  return gql`
  mutation {
    updateWorkbook(
      workbookId: "${id}",
      field: "${field}",
      value: "${value}"
    ) {
      _id
      title
      parentId
    }
  }
`;
};

export const UPDATE_WORKBOOK_FOLDER = ({ id, field, value }) => {
  return gql`
    mutation {
      updateWorkbookFolder (
        workbookFolderId: "${id}",
        field: "${field}",
        value: "${value}"
      ) {
        _id
        title
        parentId
      }
    }
  `
}

export const DELETE_WORKBOOK = (id) => {
  return gql`
    mutation {
      deleteWorkbook(
        workbookId:"${id}"
      ) {
        success
      }
    }
  `
}

export const DELETE_WORKBOOK_FOLDER = (id) => {
  return gql`
    mutation {
      deleteWorkbookFolder(
        workbookFolderId:"${id}"
      ) {
        success
      }
    }
  `
}
