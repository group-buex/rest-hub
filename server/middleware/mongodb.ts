import mongoose from "mongoose";

const CONSTANTS = {
  MONGO_USER: process.env.NEXT_PUBLIC_MONGO_USER,
  MONGO_PWD: process.env.NEXT_PUBLIC_MONGO_PWD,
  MONGO_DBNAME: process.env.NEXT_PUBLIC_MONGO_DBNAME,
};

const connectDB = (handler) => async (req, res) => {
  const { MONGO_USER, MONGO_PWD, MONGO_DBNAME } = CONSTANTS;

  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@cluster0.d8zki.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`,
    { keepAlive: true, keepAliveInitialDelay: 300000 }
  );
  return handler(req, res);
};

export default connectDB;
