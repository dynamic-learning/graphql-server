import gql from "graphql-tag";

export const GET_WORKBOOKS = gql`
  query {
    workbookViewer {
      _id
      title
      parentId
      type
    }
  }
`;

export const GET_WORKBOOK = (id: string) => gql`
query {
  workbook(workbookId: "${id}") {
    _id
    title
    owner
    slides
    parentId
  }
} 
`;

export const LOGIN = (email: string, password: string) => gql`
query {
  login(email:"${email}", password:"${password}") {
    token
    userId
    tokenExpiration
  }
}
`;
