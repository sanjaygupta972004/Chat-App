import mongoose, {Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
   AvailableLoginType,
   AvailableUserRoles,
   UserRolesEnum,
   UserLoginType,
   TEMPORARY_EXPIRY_TOKEN_TIME,
} from "../constant.js";
import  CryptoJS from "crypto-js";


const userSchema = new Schema(
   {
      fullName: {
         type: String,
         require :true ,
         min:3,
         max: 30,
         trim:true
      },
      username: {
         type: String,
         require: true,
         unique: true,
         trim:true,
         lowercase:true,
         index:true,
      },
      password: {
         type: String,
         required:true,
         trim:true,
      },
      email: {
         type: String,
         required:true,
         trim:true,
         unique:true,
      },
      profileImage: {
         type: String,
         required: true,
      },
      coverImage: {
         type: String,
      },
      role: {
         type: String,
         enum: AvailableUserRoles,
         default: UserRolesEnum.USER,
      },
      loginType: {
         type: String,
         enum: AvailableLoginType,
         default: UserLoginType.EMAIL_PASSWORD,
      },
      isEmailVerified: {
         type: Boolean,
         default: false,
      },
      forgotPasswordToken: {
         type: String,
      },
      forgotPasswordTokenExpiry: {
         type: Date,
      },
      emailVerificationToken: {
         type: String,
      },
      emailVerificationTokenExpiry: {
         type: Date,
      },
      refreshToken: {
         type: String,
      },
   },
   {timestamps:true}
   )

   userSchema.pre("save",async function(next){
      if(!this.isModified("password")) return next();
      try {
         const hashPassword = await bcrypt.hash(this.password,10)
         this.password = hashPassword;
         return next();
         
      } catch (error) {
         console.error(error.message)
         throw new Error("Error hashing password")
         
      }
   })

   userSchema.methods.comparePassword = async function(password){
      try {
         const isPasswordCorrect = await bcrypt.compare(password,this.password)
         return isPasswordCorrect;
         
      } catch (error) {
         console.error(error.message)
         throw new Error("Error comparing password")
      }
   }

   userSchema.methods.accessTokenGenerator = async function(){
   try {
      return await jwt.sign(
         {
            _id:this._id,
            username:this.username,
            email:this.email,
         },
         process.env.JWT_ACCESS_TOKEN_SECRET,
         {
            expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME,
         }
      )
      
   } catch (error) {
      console.error(error.message)
      throw new Error("Error during generating access token")
   }
   }


   userSchema.methods.refreshTokenGenerator = async function(){
      try {
      return jwt.sign(
         {
            _id:this._id,
            username:this.username,
            email:this.email,
         },
         process.env.JWT_REFRESH_TOKEN_SECRET,
         {
            expiresIn:process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME,
         }
      )
      } catch (error) {
         console.error(error.message)
         throw new Error("Error during generating refresh token")
      }
   }


   userSchema.methods.emailGenerateTemporaryToken = async function(){
   
      const unHashedToken =  await `${this._id}${Date.now()}`; 
      const hashedToken =  await CryptoJS.SHA256(unHashedToken).toString(CryptoJS.enc.Base64)
      const expiryTime =  await Date.now() + TEMPORARY_EXPIRY_TOKEN_TIME; 
      return {unHashedToken,hashedToken,expiryTime}
   }

   export const User = mongoose.model("User",userSchema)
