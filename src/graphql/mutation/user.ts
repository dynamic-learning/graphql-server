import User from "../../models/user";
import bcrypt from "bcrypt";
import { getAuthToken } from "../common/user";
import { auth } from "google-auth-library";
import { requestGithubToken, requestGithubUserAccount } from "../../socialApi";

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

export const loginWithGoogle = async (_root, args) => {
  const client = auth.fromAPIKey(process.env.GOOGLE_SECRET!);
  const { idToken } = args;
  const res = await client.verifyIdToken({ idToken });
  if (!res) {
    throw new Error("Invalid token");
  }
  const { email } = res.getPayload()!;
  return await useEmailToGetAuthToken(email!);
};

export const loginWithGithub = async (_root, args) => {
  const { code } = args;
  const credentials = {
    code,
    client_secret: process.env.GITHUB_SECRET,
    client_id: process.env.GITHUB_CLIENT_ID,
  };
  let res = await requestGithubToken(credentials);
  const { access_token } = res;
  res = await requestGithubUserAccount(access_token);
  const { email } = res;
  return await useEmailToGetAuthToken(email);
};

const useEmailToGetAuthToken = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    const username = email.split("@")[0];
    const userInput = {
      userInput: { username, email, password: process.env.DEFAULT_PASSWORD },
    };
    const authToken = await createUser(null, userInput);
    return authToken;
  } else {
    return getAuthToken(user);
  }
};
