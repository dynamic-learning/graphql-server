import User from "../../models/user";
import { getAuthToken } from "../common/user";

import bcrypt from "bcrypt";

export const login = async (_root, args) => {
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new Error("User does not exist!");
  }
  const isPasswordEqual = await bcrypt.compare(
    args.password,
    user.get("password")
  );
  if (!isPasswordEqual) {
    throw new Error("Password is incorrect!");
  }
  return getAuthToken(user);
};
