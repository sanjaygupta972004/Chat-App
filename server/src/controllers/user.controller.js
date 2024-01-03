import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { upLoadOnCloudinary } from '../utils/cloudinary.js';

const signUp = asyncHandler(async(req,res)=>{
 
   const {fullName,username,password,email} = req.body;
   if(!fullName || !username || !password || !email){
      throw new ApiError(402,"All fields are required")
   }
   //console.log(req.files)

   const oldUser = await User.findOne({email})
   if(oldUser){
      throw new ApiError(402,"User already exists")
   }

   const localPathProfileImage = req.files?.profileImage[0]?.path;

  // console.log(localPathProfileImage)
    
   if(!localPathProfileImage){
      throw new ApiError(402,"Profile Image is required")
   }

   const localPathCoverImage = req.files?.coverImage[0]?.path;

 

   const profileImage = await upLoadOnCloudinary(localPathProfileImage);
   const coverImage = await upLoadOnCloudinary(localPathCoverImage);

   if(!profileImage){
      throw new ApiError(500,"Error uploading profile image")
   }
   const user = await User.create({
      fullName,
      username:username.toLowerCase(),
      password,
      email,
      profileImage:profileImage.url,
      coverImage:coverImage.url
   })

   await user.save();
   const exitingUser = await User.findOne({email}).select("-password")

   return res
   .status(201)
   .json(new ApiResponse(201,exitingUser,"User created successfully"))

})

export {
   signUp,
}