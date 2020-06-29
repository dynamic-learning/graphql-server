import Workbook from "../models/workbooks";
import WorkbookFolder from "../models/workbookFolders";

const Query = {
  workbook: async (root, args) => {
    const workbook = await Workbook.findById(args.workbookId);
    return workbook;
  },
  workbookViewer: async (root, args) => {
    const filter = { owner: args.owner };
    let workbooks, workbookFolders;
    try {
      workbooks = await Workbook.find(filter);
      console.log(workbooks);
      workbooks = workbooks.map((workbook) => {
        return {
          ...workbook._doc,
          parentId: workbook.parentId ? workbook.parentId._id : "0",
          type: "file",
        };
      });
    } catch (err) {
      console.log(err);
    }

    try {
      workbookFolders = await WorkbookFolder.find(filter);
      console.log(workbookFolders);
      workbookFolders = workbookFolders.map((workbookFolder) => {
        return {
          ...workbookFolder._doc,
          parentId: workbookFolder.parentId ? workbookFolder.parentId._id : "0",
          type: "folder",
        };
      });
    } catch (err) {
      console.log(err);
    }

    return [...workbooks, ...workbookFolders];
  },
};

export default Query;
