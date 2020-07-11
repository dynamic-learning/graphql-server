import Workbook from "../models/workbooks";
import WorkbookFolder from "../models/workbookFolders";
import Sim from "../models/sims";

const Query = {
  workbook: async (root, args) => {
    return await Workbook.findById(args.workbookId);
  },
  sims: async (root, args) => {
    const keyword = args.keyword;    
    const query = {
      $or : [
        {
          title : {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          description: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          tags: {
            $regex: keyword,
            $options: "i"
          }
        }  
      ]
    }
    try {
      return await Sim.find(query);
    }
    catch (err) {
      console.log(err);
    }
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
