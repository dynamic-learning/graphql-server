import Workbook from "../models/workbooks";
import WorkbookFolder from "../models/workbookFolders";
import Sim from "../models/sims";
import User from "../models/users";
import bcrypt from "bcrypt"

const Mutation = {
  createWorkbook: async (root, args) => {
    try {
      return await new Workbook({
        title: args.workbook.title,
        owner: args.workbook.owner,
        slides: args.workbook.slides,
      }).save();
    } catch (err) {
      console.log(err);
    }
  },

  updateWorkbook: async (root, args) => {
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
  },

  createWorkbookFolder: async (root, args) => {
    try {
      return new WorkbookFolder({
        title: args.workbookFolder.title,
        owner: args.workbookFolder.owner,
      }).save();
    } catch (err) {
      console.log(err);
    }
  },

  updateWorkbookFolder: async (root, args) => {
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
  },

  deleteWorkbookFolder: async (root, args) => {
    const update = { _id: args.workbookFolderId };
    console.log(update);
    try {
      const workbookFolder = await WorkbookFolder.deleteOne(update);
      console.log(workbookFolder);
      return { success: !!workbookFolder };
    } catch (err) {
      console.log(err);
    }
  },

  deleteWorkbook: async (root, args) => {
    const update = { _id: args.workbookId };
    console.log(update);
    try {
      const workbook = await Workbook.deleteOne(update);
      console.log(workbook);
      return { success: !!workbook };
    } catch (err) {
      console.log(err);
    }
  },

  createSim: async (root, args) => {
    try {
      return await new Sim({
        _id: args.sim._id,
        owner: args.sim.owner,
        title: args.sim.title,
        description: args.sim.description,
        tags: args.sim.tags,
        imageURL: args.sim.imageURL,
      }).save();
    }
    catch (err) {
      console.log(err);
    }
  },

  updateSim: async (root, args) => {
    const update = {
      title: args.updatedSim.title,
      description: args.updatedSim.description,
      tags: args.updatedSim.tags,
      imageURL: args.updatedSim.imageURL
    };
    try {
      return await Sim.findByIdAndUpdate(
        args.simId,
        update,
        {
          new: true,
          useFindAndModify: false,
        }
      );
    } catch (err) {
      console.log(err);
    }
  },

  deleteSim: async (root, args) => {
    const update = { _id: args.simId };
    try {
      const sim = await Sim.deleteOne(update);
      return { success: !!sim.deletedCount };
    } catch (err) {
      console.log(err);
    }
  },
  
  createUser: async (root, args) => {
    const user = await User.findOne({ email:args.userInput.email })

    if(user) {
      throw new Error("User exists already")
    }

    try {
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      const res = await user.save()
      res.set("password", null)
      return res
    } catch(err) {
      console.log(err);
    }
  }
};

export default Mutation;
