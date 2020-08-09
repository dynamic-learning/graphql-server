import QueryType from "./query";
import MutationType from "./mutation";

import WorkbookType from "./workbook";
import SimType from "./sim";
import UserType from "./user";

import CommonType from "./common";

const TypeDefs = `
    ${QueryType}
    ${MutationType}

    ${WorkbookType}
    ${SimType}
    ${UserType}

    ${CommonType}
`;

export default TypeDefs;
