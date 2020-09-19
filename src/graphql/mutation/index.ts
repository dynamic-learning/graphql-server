import * as SimMutation from "./sim";
import * as WorkbookMutation from "./workbook";
import * as UserMutation from "./user";

const mutation = {
  ...SimMutation,
  ...WorkbookMutation,
  ...UserMutation,
};

export default mutation;
