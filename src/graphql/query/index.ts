import * as SimQueries from "./sim";
import * as WorkbookQueries from "./workbook";
import * as UserQueries from "./user";

const Sim = {
  ...SimQueries,
  ...WorkbookQueries,
  ...UserQueries
};

export default Sim;