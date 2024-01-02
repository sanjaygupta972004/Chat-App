import mongoose, { Mongoose,Schema } from "mongoose";

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
          type: String
      }
   },
   {timestamps:true}
   )

   export const User = mongoose.model("user",userSchema)