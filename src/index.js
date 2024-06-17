// require('dotenv').config({path: './env'})
// diya
// EjY11Te26ggzF6Un
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(` Server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGOD DB CONNECTION FAILED !!! ", err);
  });

/*
import mongoose from 'mongoose'
import express from "express"
const app = express()


const url = 'mongodb+srv://pooja:pooja@puja1.mtqjdpu.mongodb.net/'

;( async ()=>{
  try {
    await mongoose.connect(`${url}/youtube`)
    app.on("error", (error)=>{
      console.log("ERROR:", error);
      throw error
    })
    app.listen(3000, () =>{
      console.log(`App is listening on port 3000`);
    })
    
  } catch (error) {
    console.log("ERROR ", error);
    throw error
  }
}

)()

*/
