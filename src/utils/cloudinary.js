import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const upload = await cloudinary.uploader.upload(filePath,{
        resource_type:"auto"
    });
    console.log("file has been uploaded to cloud",upload.url);
    return upload
  } catch (error) {
      fs.unlinkSync(filePath) // remove the file from the server when the upload gets failed
      return null 
  }
};

export default uploadOnCloudinary
