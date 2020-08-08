import * as SimQueries from "./sim";
import * as WorkbookQueries from "./workbook";

const Sim = {
  ...SimQueries,
  ...WorkbookQueries,
};

export default Sim;