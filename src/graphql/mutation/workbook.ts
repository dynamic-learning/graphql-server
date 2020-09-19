import Workbook from "../../models/workbook";
import WorkbookFolder from "../../models/workbookFolder";
import { doesUserOwnEntity } from "../../service/permission";

export const createWorkbook = async (_root, args, context) => {
  const { user } = context;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    return await new Workbook({
      title: args.workbook.title,
      owner: user.userId,
      slides: args.workbook.slides,
    }).save();
  } catch (err) {
    console.log(err);
  }
};

export const createWorkbookFolder = async (_root, args, context) => {
  const { user } = context;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    return new WorkbookFolder({
      title: args.workbookFolder.title,
      owner: user.userId,
    }).save();
  } catch (err) {
    console.log(err);
  }
};

export const updateWorkbook = async (_root, args, context) => {
  const { user } = context;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  if (!(await doesUserOwnEntity(user.userId, args.workbookId, "Workbook"))) {
    throw new Error("User is not authorized");
  }

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

export const updateWorkbookFolder = async (_root, args, context) => {
  const { user } = context;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  if (
    !(await doesUserOwnEntity(
      user.userId,
      args.workbookFolderId,
      "Workbookfolder"
    ))
  ) {
    throw new Error("User is not authorized");
  }

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

export const deleteWorkbookFolder = async (_root, args, context) => {
  const { user } = context;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  if (
    !(await doesUserOwnEntity(
      user.userId,
      args.workbookFolderId,
      "Workbookfolder"
    ))
  ) {
    throw new Error("User is not authorized");
  }

  const update = { _id: args.workbookFolderId };
  try {
    const workbookFolder = await WorkbookFolder.deleteOne(update);
    return { success: !!workbookFolder };
  } catch (err) {
    console.log(err);
  }
};

export const deleteWorkbook = async (_root, args, context) => {
  const { user } = context;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  if (!(await doesUserOwnEntity(user.userId, args.workbookId, "Workbook"))) {
    throw new Error("User is not authorized");
  }

  const update = { _id: args.workbookId };
  try {
    const workbook = await Workbook.deleteOne(update);
    return { success: !!workbook };
  } catch (err) {
    console.log(err);
  }
};
