import User from "../../models/user";
import jwt from "jsonwebtoken";
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
  const token = jwt.sign(
    {
      userId: user.get("id"),
      email: user.get("email"),
      type: user.get("type"),
    },
    process.env.AUTH_KEY!,
    {
      expiresIn: "1h",
    }
  );
  return {
    userId: user.get("id"),
    token,
    tokenExpiration: 1,
    type: user.get("type"),
  };
};
