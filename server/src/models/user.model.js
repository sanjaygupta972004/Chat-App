import mongoose, {Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      },
      profileImage: {
          type: String,
          required: true,
      },
      coverImage: {
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


   export const User = mongoose.model("User",userSchema)
