import * as SimQuery from "./sim";
import * as WorkbookQuery from "./workbook";
import * as UserQuery from "./user";

const Query = {
  ...SimQuery,
  ...WorkbookQuery,
  ...UserQuery,
};

export default Query;
