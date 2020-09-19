import User from "../../models/user";
import bcrypt from "bcrypt";
import { getAuthToken } from "../common/user";

export const createUser = async (_root, args) => {
  const user = await User.findOne({ email: args.userInput.email });
  if (user) {
    throw Error("User exists already");
  }
  const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
  const newUser = new User({
    email: args.userInput.email,
    password: hashedPassword,
    username: args.userInput.username,
    type: "normal",
  });
  const savedUser = await newUser.save();
  return getAuthToken(savedUser);
};
