import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Chat} from "../models/chat.model.js"
import { User } from "../models/user.model.js";


const accessChat = asyncHandler(async (req,res)=>{
   const {userId} = req.body

   if(!userId){
      throw new ApiError(400,"User id is required")
   }

   let  isChat = await Chat.find({
      isGroupChat : false,
      $and :[
         {
            users:{
               $elemMatch:{
                  $eq:userId
               }
            },
            users:{
               $elemMatch:{
                  $eq:req.user._id
               }
            }

         }
      ]
   }).populate("users","-password").populate("latestMessage")

   // isChat = await User.populate(isChat, {
   //    path:"latestMessage.sender",
   //    select:"fullName profileImage email "
   // })

   console.log(isChat[0])

   if(isChat.length > 0){
      return res
      .status(200)
      .json(new ApiResponse(200,isChat[0],"Chat found"))
   } else { 
      const chatData = {
         chatName: "sender",
         isGroupChat: false,
         users: [req.user._id,userId],
      }

     // console.log(chatData)

      try {
         const createdChat = await Chat.create(chatData)
           
        // console.log(createdChat)

            const fullChat = await Chat.findById({ _id: createdChat._id}).populate("users","-password")
            return res
            .status(201)
            .json(new ApiResponse(201,fullChat,"Chat created"))
         
      } catch (error) {
         throw new ApiError(500,"Something went wrong while creating chat")
      }
   }
   })


export {
   accessChat,
}



