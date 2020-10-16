import gql from "graphql-tag";

export const ADD_WORKBOOK = gql`
  mutation {
    createWorkbook(workbook: { title: "History", slides: "slide" }) {
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
    createWorkbookFolder(workbookFolder: { title: "Social Science" }) {
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
  `;
};

export const DELETE_WORKBOOK = (id) => {
  return gql`
    mutation {
      deleteWorkbook(
        workbookId:"${id}"
      ) {
        success
      }
    }
  `;
};

export const DELETE_WORKBOOK_FOLDER = (id) => {
  return gql`
    mutation {
      deleteWorkbookFolder(
        workbookFolderId:"${id}"
      ) {
        success
      }
    }
  `;
};

export const ADD_USER = (username, email, password) => {
  return gql`
    mutation {
      createUser(userInput: { email:"${email}", password:"${password}", username:"${username}" }) {
        userId
        username
        email
        type
        token
        tokenExpiration
      }
    }
  `;
};

export const ADDSIM = (id, title, description, tags, imgUrl, owner) => {
  return gql`
    mutation {
      createSim(sim: {
        _id: "${id}",
        title: "${title}",
        description: "${description}",
        tags: "${tags}",
        imageURL: "${imgUrl}",
        owner:"${owner}"
      }) {
        _id
        owner
      }
  }
  `;
};

export const UPDATE_SIM = (simId, title, description, tags, imgUrl) => {
  return gql`
    mutation {
      updateSim(simId:"${simId}",updatedSim: {
        title:"${title}",
        description:"${description}",
        tags:"${tags}",
        imageURL:"${imgUrl}"
      }) {
        _id
        title
      }
    }
  `;
};

export const DELETE_SIM = (simId) => {
  return gql`
    mutation {
      deleteSim(simId: "${simId}") {
        success
      }
    }
  `;
};
