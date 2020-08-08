import * as WorkbookMutations from "./workbook"
import * as SimMutations from "./sim"
import * as UserMutations from "./user"

const Mutation = {
  ...WorkbookMutations,
  ...SimMutations,
  ...UserMutations
};

export default Mutation;