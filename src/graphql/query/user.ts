import User from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (root, { email, password }) => {
 const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist!");
  }
  //@ts-ignore
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    throw new Error("Password is incorrect");
  }
  //@ts-ignore
  const token = jwt.sign(
    //@ts-ignore
    { user: user.id, email: user.email },
    "some-super-secret-key",
    {
      expiresIn: "1h",
    }
  );
  return {
    //@ts-ignore
    userId: user.id,
    token,
    tokenExpiration: 1,
  };
};
