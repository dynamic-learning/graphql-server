import Workbook from "../../models/workbook";
import WorkbookFolder from "../../models/workbookFolder";

export const createWorkbook = async (root, args) => {
  try {
    return await new Workbook({
      title: args.workbook.title,
      owner: args.workbook.owner,
      slides: args.workbook.slides,
    }).save();
  } catch (err) {
    console.log(err);
  }
};

export const updateWorkbook = async (root, args) => {
  const editableFields = ["title", "slides", "parentId"];
  if (editableFields.includes(args.field)) {
    const update = {};
    update[args.field] = args.value;
    try {
      const workbook = await Workbook.findByIdAndUpdate(
        args.workbookId,
        update,
        {
          new: true,
          useFindAndModify: false,
        }
      );
      return workbook;
    } catch (err) {
      console.log(err);
    }
  } else {
    throw new Error(`The field ${args.field} is not editable`);
  }
};

export const createWorkbookFolder = async (root, args) => {
  try {
    return new WorkbookFolder({
      title: args.workbookFolder.title,
      owner: args.workbookFolder.owner,
    }).save();
  } catch (err) {
    console.log(err);
  }
};

export const updateWorkbookFolder = async (root, args) => {
  const editableFields = ["title", "parentId"];
  if (editableFields.includes(args.field)) {
    const update = {};
    update[args.field] = args.value;
    try {
      const workbookFolder = await WorkbookFolder.findByIdAndUpdate(
        args.workbookFolderId,
        update,
        {
          new: true,
          useFindAndModify: false,
        }
      );
      return workbookFolder;
    } catch (err) {
      console.log(err);
    }
  } else {
    throw new Error(`The field ${args.field} is not editable`);
  }
};

export const deleteWorkbookFolder = async (root, args) => {
  const update = { _id: args.workbookFolderId };
  console.log(update);
  try {
    const workbookFolder = await WorkbookFolder.deleteOne(update);
    console.log(workbookFolder);
    return { success: !!workbookFolder };
  } catch (err) {
    console.log(err);
  }
};

export const deleteWorkbook = async (root, args) => {
  const update = { _id: args.workbookId };
  console.log(update);
  try {
    const workbook = await Workbook.deleteOne(update);
    console.log(workbook);
    return { success: !!workbook };
  } catch (err) {
    console.log(err);
  }
};
