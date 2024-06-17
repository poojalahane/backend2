import mongoose from "mongoose";
// import {DB_NAME} from '../constants.js'
// anna
// BcaoSP0HR5wB65TO

const url2 = "mongodb+srv://anna:BcaoSP0HR5wB65TO@puja1.mtqjdpu.mongodb.net/";
const url = "mongodb+srv://diya:EjY11Te26ggzF6Un@puja1.mtqjdpu.mongodb.net/";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${url2}`);
    console.log(
      `\n  MongoDb Connected Successfully..${connectionInstance.connection.host} !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODBO CONNECTION ERROR", error);
    process.exit(1);
  }
};
export default connectDB;
