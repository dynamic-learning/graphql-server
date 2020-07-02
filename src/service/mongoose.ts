import mongoose from "mongoose";

const connectToMongoose = async () => {
  const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.x1n5v.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅  Connected to mongoose");
};

export default connectToMongoose;
