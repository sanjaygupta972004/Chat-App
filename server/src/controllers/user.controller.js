import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { upLoadOnCloudinary } from '../utils/cloudinary.js';
import {
     sendEmail,
     emailVerificationMailgenContent,
     forgotPasswordMailgenContent
} from '../utils/mail.js';
import { UserRolesEnum } from '../constant.js';
import  CryptoJS from "crypto-js";
import mongoose from "mongoose";

const generatorAccessTokenAndRefreshToken = async (id) => {
   try {
      const user = await User.findById(id);
      if(!user){
         throw new ApiError(404, "User not found")
      }

      const accessToken = await user.accessTokenGenerator();
      const refreshToken = await user.refreshTokenGenerator();

      if (!accessToken || !refreshToken) {
         throw new ApiError(500, "Error during generating access token and refresh token")
      }
      
      user.refreshToken = refreshToken;
      user.save({
         validateBeforeSave: false
      });

      return {
         accessToken,
         refreshToken
      }
   } catch (error) {
      new ApiError(500, "Error during generating access token and refresh token")
   }
}


const signUp = asyncHandler(async(req,res)=>{
 
   const {fullName,username,password,email,role} = req.body;
   if(!fullName || !username || !password || !email){
      throw new ApiError(400,"All fields are required")
   }
   // console.log(req.body)
   // console.log(req.files)

   const oldUser = await User.findOne({email})
   if(oldUser){
      throw new ApiError(400,"User already exists")
   }

   const localPathProfileImage = req.file ?.path;

  // console.log(localPathProfileImage)

   if(!localPathProfileImage){
      throw new ApiError(400,"Profile Image is required")
   }

   // let localPathCoverImage 
   // if(req.files?.coverImage){
   //    localPathCoverImage = req.files?.coverImage[0]?.path;
   // }
 

   const profileImage = await upLoadOnCloudinary(localPathProfileImage);
   // const coverImage = await upLoadOnCloudinary(localPathCoverImage);
   
  // console.log(profileImage)

   if(!profileImage){
      throw new ApiError(500,"Error uploading profile image")
   }
   const user = await User.create({
      fullName,
      username:username.toLowerCase(),
      password,
      email,
      isEmailVerified:false,
      role:role|| UserRolesEnum.USER,
      profileImage:profileImage.url,
   })

   const {unHashedToken,hashedToken,expiryTime} = await user.emailGenerateTemporaryToken();
   

   user.emailVerificationToken = hashedToken;
   user.emailVerificationTokenExpiry = expiryTime;

   user.save({validateBeforeSave:false})

   await sendEmail({
      email:user?.email,
      subject: "please verify your email",
      mailgenContent: emailVerificationMailgenContent(
         user?.username,
         `${req.protocol}://${req.get(
            "host"
          )}/api/v1/users/verify-email/${unHashedToken}`
        //  `${process.env.CORS_ORIGIN}/api/v1/auth/verify-email/${unHashedToken}`
         
      )
   })


   const exitingUser = await User.findById({_id:user._id}).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry")
   
   if(!exitingUser){
      throw new ApiError(500,"something went worng while creating user")
   }

   return res
   .status(201)
   .json(new ApiResponse(201,{user:exitingUser},"User created successfully"))
})

   
const verifyEmail = asyncHandler(async(req,res)=>{
   const {varificationToken} = req.params;   
   if(!varificationToken){
      throw new ApiError(400,"Token is required")
   }

   const hashedToken =  await CryptoJS.SHA256(varificationToken).toString(CryptoJS.enc.Base64)
    
   const user = await User.findOne({
      emailVerificationToken:hashedToken,
      emailVerificationTokenExpiry:{$gt:Date.now()}
   
   })

   if(!user){
      throw new ApiError(400,"Invalid or expired token")
   }

   user.isEmailVerified = true;
   user.emailVerificationToken = null;
   user.emailVerificationTokenExpiry = null;

   user.save({validateBeforeSave:false})

   return res
   .status(200)
   .json(new ApiResponse(200,{},"Email verified successfully"))

})


const logIn = asyncHandler(async(req,res)=>{

   const {email,password} = req.body;
   if(!email || !password){
      throw new ApiError(400,"All fields are required")
   }

   const user = await User.findOne({ email})
   if(!user){
      throw new ApiError(400,"User does not exist")
   } 

   if(!user.isEmailVerified){
      throw new ApiError(400,"Please verify your email")
   }

   if(user.loginType !== "EMAIL_PASSWORD"){
      throw new ApiError(400,
         `You are registered with ${user?.loginType.toLowerCase()}
          please login with ${user?.loginType.toLowerCase()}`)
   }

   const isPasswordCorrect = await user.comparePassword(password)
   if(!isPasswordCorrect){
      throw new ApiError(400,"Password is incorrect")
   }

   const {accessToken,refreshToken} = await generatorAccessTokenAndRefreshToken(user._id)

   //TODO:  add set cookie options
   const options = {
      httpOnly:true,
   
   }

   const isLoggedUser = await User.findOne({email}).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry")

   return res
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .status(200)
   .json(new ApiResponse(200,{accessToken,isLoggedUser},"User logged in successfully"))

})


const resendVerificationEmail = asyncHandler(async(req,res)=>{
 const {email} = req.body;

   if(!email){
      throw new ApiError(400,"Email is required")
   }

   const user  =  await User.findOne({email})
   if(!user){
      throw new ApiError(400,"User does not exist with this email address")
   }

   if(user.isEmailVerified){
      throw new ApiError(400,"Email is already verified")
   }

   const {unHashedToken,hashedToken,expiryTime} = await user.emailGenerateTemporaryToken();
   user.emailVerificationToken = hashedToken;
   user.emailVerificationTokenExpiry = expiryTime;

   user.save({validateBeforeSave:false})

   await sendEmail({
      email:user?.email,
      subject: "please verify your email",
      mailgenContent: emailVerificationMailgenContent(
         user?.username,
         `${req.protocol}://${req.get(
            "host"
          )}/api/v1/users/verify-email/${unHashedToken}`
         )
   })

   return res
   .status(200)
   .json( new ApiResponse(200,{},"Email verification link sent successfully"))
})


const forgotPasswordRequest = asyncHandler(async(req,res)=>{
   const {email} = req.body;

   if(!email){
      throw new ApiError(400,"Email is required")
   }

   const user = await User.findOne({email})
   if(!user){
      throw new ApiError(400,"User does not exist with this email address")
   }

   const {unHashedToken,hashedToken,expiryTime} = await user.generateTemporaryPasswordResetToken();

   user.forgotPasswordToken = hashedToken;
   user.forgotPasswordTokenExpiry = expiryTime;


   user.save({validateBeforeSave:false})

   await sendEmail({
      email:user?.email,
      subject: "Password reset request",
      mailgenContent: forgotPasswordMailgenContent(
         user?.username,
         `${req.protocol}://${req.get(
            "host"
          )}/api/v1/users/reset-password/${unHashedToken}`
         )
   })

   return res
   .status(200)
   .json( new ApiResponse(200,{},"Password reset link sent successfully"))

})



const resetForgotPassword = asyncHandler(async(req,res)=>{
   const {password} = req.body;
   const {resetPasswordToken} = req.params;

   if(!password || !resetPasswordToken){
      throw new ApiError(400,"Password and resetPasswordToken is required")
   }
  
   const hashedToken = await CryptoJS.SHA256(resetPasswordToken).toString(CryptoJS.enc.Base64)
    


   const user = await User.findOne({
      forgotPasswordToken:hashedToken,
      forgotPasswordTokenExpiry:{$gt:Date.now()}
   })

   if(!user){
      throw new ApiError(400,"Invalid or expired token")
   
   }
  
   user.password = password;
   user.forgotPasswordToken = null;
   user.forgotPasswordTokenExpiry = null;

   user.save({validateBeforeSave:false})

   return res
   .status(200)
   .json( new ApiResponse(200,{},"Password reset successfully"))

})
 


const refreshAccessToken = asyncHandler(async(req,res)=>{
   const {oldRefreshToken} = req.cookies;
   if(!oldRefreshToken){
      throw new ApiError(400,"Refresh token is required")
   }
   const user = await User.findOne({refreshToken:oldRefreshToken})
   if(!user){
      throw new ApiError(400,"Invalid refresh token")
   }

   const {accessToken,refreshToken} = await generatorAccessTokenAndRefreshToken(user._id)
  
   user.refreshToken = refreshToken;
   user.save({validateBeforeSave:false})

   const options = {
      httpOnly:true,
   }

   return res
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshAccessToken,options)
   .status(200)
   .json(new ApiResponse(200,{accessToken},"Access token refreshed successfully"))

})



const logOut = asyncHandler(async(req,res)=>{

const {_id} = req.user?._id

if(isValidObjectId(_id)){
   new ApiError(400, "invalid credential")
}

await User.findByIdAndUpdate(
   {
      _id:_id
   },
   {
      refreshToken:null,
      isEmailVerified:false,

   },
   {
      new:true
   }
)

const options = {
   httpOnly:true,
}

return res
     .status(200)
     .cookie("accessToken","",options)
     .cookie("refreshToken","",options)
     .json(new ApiResponse(200,{},"User logged out successfully"))

})



const assignRole = asyncHandler(async(req,res)=>{
const {userId} = req.params;
const {role} = req.body

if(mongoose.Types.ObjectId.isValid(userId)){
   new ApiError(400, "invalid user id")
}

if(!role){
   new ApiError(400, "Role is required")
}

const user = await User.findByIdAndUpdate({
   _id:userId
},{
   role: role
},{
   new:true
}).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry")

if(!user){
   new ApiError(500, "something went wrong while updating user role")
}

return res
     .status(200)
     .json(new ApiResponse(200,{user},"User role updated successfully"))

})


const changePassword = asyncHandler(async(req,res)=>{
   const {oldPassword,newPassword} = req.body;
   const {_id} = req.user?._id;
   if(mongoose.Types.ObjectId.isValid(_id)){
      new ApiError(400, "invalid user id")
   }
   if(!oldPassword || !newPassword){
      new ApiError(400, "Old password and new password is required")
   }

   const user = await User.findById(_id)

   if(user._id.toString() !== req.user?._id.toString()){
      throw new ApiError(401, "Unauthorized")
   }

   const isPasswordCorrect = await user.comparePassword(oldPassword)
   if(!isPasswordCorrect){
      throw new ApiError(400,"Old password is incorrect")
   }

   user.password = newPassword;
   user.save({validateBeforeSave:false})

   return res
       .status(200)
       .json(new ApiResponse(200,{},"Password changed successfully"))
})




const getAllUsers = asyncHandler(async (req, res) => {
   const keyword = req.query.search ? {
       $or: [
           {
               fullName: {
                   $regex: req.query.search,
                   $options: "i"
               }
           },
           {
               email: {
                   $regex: req.query.search,
                   $options: "i"
               }
           }
       ]
   } : {};

   const users = await User.find(keyword).find({_id:{$ne:req.user?._id}}).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry");
   
   if(users.length === 0){
      throw new ApiError(404, "No user found")
   }

   return res
       .status(200)
       .json(new ApiResponse(200, users, "Users fetched successfully"));
});


const getCurrentUser = asyncHandler(async (req, res) => {
 const {_id} = req.user?._id;
   if(mongoose.Types.ObjectId.isValid(_id)){
      new ApiError(400, "invalid user id")
   }

   const user = await User.findById(_id).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry");
   
   if(user._id.toString() !== req.user?._id.toString()){
      throw new ApiError(401, "Unauthorized")
   }
   
   if(!user){
      throw new ApiError(404, "No user found")
   }

   return res
       .status(200)
       .json(new ApiResponse(200, user, "User fetched successfully"));
})


const handleSolcialLogin = asyncHandler(async(req,res)=>{
   const {_id} = req.user?._id;
   if(mongoose.Types.ObjectId.isValid(_id)){
      new ApiError(400, "invalid user id")
   }

   const user = await User.findById(_id).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry");   
   if(user._id.toString() !== req.user?._id.toString()){
      throw new ApiError(401, "Unauthorized")
   }

   if(!user){
      throw new ApiError(404, "No user found")
   }

   const {accessToken,refreshToken} = await generatorAccessTokenAndRefreshToken(user._id)

   const options = {
      httpOnly:true,
   }

   return res
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .status(200)
   .redirect(
      `${process.env.CLIENT_SSO_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
})





export {
   signUp,
   verifyEmail,
   forgotPasswordRequest,
   resetForgotPassword,
   refreshAccessToken,
   resendVerificationEmail,
   logIn,
   logOut,
   assignRole,
   getCurrentUser,
   getAllUsers,
   changePassword,
   handleSolcialLogin
}