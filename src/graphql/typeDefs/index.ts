import { gql } from "apollo-server";
import MutationTypes from './mutation'
import QueryTypes from './query'
import WorkbookTypes from "./workbook"
import SimTypes from "./sim"
import UserTypes from "./user"

const typeDefs = gql`
  ${MutationTypes}
  ${QueryTypes}
  ${WorkbookTypes}
  ${SimTypes}
  ${UserTypes}
`;

export default typeDefs;
