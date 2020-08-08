import User from "../../models/user";
import bcrypt from "bcrypt";

export const createUser = async (root, args) => {
  const user = await User.findOne({ email: args.userInput.email });

  if (user) {
    throw new Error("User exists already");
  }

  try {
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const user = new User({
      email: args.userInput.email,
      password: hashedPassword,
    });
    const res = await user.save();
    res.set("password", null);
    return res;
  } catch (err) {
    console.log(err);
  }
};
