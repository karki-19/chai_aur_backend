import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/userModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async(req,res)=>{

    const{username,email,password,fullname} = req.body;

    if([fullname,email,password,username].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All Fields are Required")
    }
    const userData = User.findOne({
        $or:[{ username },{ email }]
    })
    console.log(userData)

    if(userData){
        throw new ApiError(400,"User already exist")
    }

   const avatarlocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;
     
   if(!avatarlocalPath){
    throw new ApiError(400,"Avatar is necessary")
   }

   const avatar  = await uploadOnCloudinary(avatarlocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400,"Avatar is required")
   }

   const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
   )
   if(!createdUser){
    throw new ApiError(500,"Creation error")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered")
   )
})


export default registerUser