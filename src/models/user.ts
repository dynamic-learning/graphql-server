import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
});

export default mongoose.model("User", userSchema);
