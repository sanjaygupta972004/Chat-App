import mongoose, { Mongoose,Schema } from "mongoose";
import bcrypt from "bcrypt";

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
   

   export const User = mongoose.model("user",userSchema)



   userSchema.methods.comparePassword = async function(password){
      try {
         const isPasswordCorrect = await bcrypt.compare(password,this.password)
         return isPasswordCorrect;
         
      } catch (error) {
         console.error(error.message)
         throw new Error("Error comparing password")
      }
   }
