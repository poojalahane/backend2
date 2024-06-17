import mongoose from "mongoose";
// import {DB_NAME} from '../constants.js'
const url = "mongodb+srv://diya:EjY11Te26ggzF6Un@puja1.mtqjdpu.mongodb.net/";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${url}`);
    console.log(
      `\n  MongoDb Connected Successfully..${connectionInstance.connection.host} !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODBO CONNECTION ERROR", error);
    process.exit(1);
  }
};
export default connectDB;
