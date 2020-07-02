import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WorkbookFolderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "workbookfolders",
  },
});

export default mongoose.model("Workbookfolder", WorkbookFolderSchema);
