import dotenv from "dotenv";
import { connectDB } from "./src/db/index.js";
import express from "express"

dotenv.config();

const app = express();

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on Port:${process.env.PORT}`)
})

