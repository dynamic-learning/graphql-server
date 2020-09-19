import jwt from "jsonwebtoken";

export const getAuthToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.get("id"),
      email: user.get("email"),
      type: user.get("type"),
      username: user.get("username"),
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
    username: user.get("username"),
    email: user.get("email"),
  };
};
