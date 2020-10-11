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

export const currentUser = async (_root, _args, context) => {
  const { user } = context;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  return {
    _id: user.userId,
    username: user.username
  };
};
