import gql from 'graphql-tag'

export const GET_WORKBOOKS = gql`
query {
  workbookViewer (owner: "13jnafso34") {
    _id
    title
    parentId
    type
  }
}  
`

export const GET_WORKBOOK = (id:string) => gql`
query {
  workbook(workbookId: "${id}") {
    _id
    title
    owner
    slides
    parentId
  }
} 
`