import mongoose from "mongoose";

export const connectDB = async()=>{
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/ChaiAurBackend")
    console.log("Connected to Database")
  } catch (error) {
    console.log("Connection to Mongo Failed here",error)
  }
}