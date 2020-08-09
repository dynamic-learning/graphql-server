import jwt from "jsonwebtoken";

const context = ({ req }) => {
  try {
    const token = req.headers.authorization || "";
    const user = jwt.verify(token, process.env.AUTH_KEY!);
    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
};

export default context;
