import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Message } from "../models/message.model.js"
import { Chat } from "../models/chat.model.js"
import { isValidObjectId } from "mongoose"

const commonAggregationPipeline = ()=>{
   return [
      {
         $lookup: {
            from: "users",
            localField: "sender",
            foreignField: "_id",
            as: "sender",
            pipeline: [
               {
                  $project: {
                     email: 1,
                     fullname: 1,
                     username: 1,
                     profileImage: 1
                  }
               }
            ]
            
         }
      },
      {
         $addFields: {
            sender: { $arrayElemAt: ["$sender", 0] }
         }
      },
   ]
}


const getAllMessages = asyncHandler(async (req, res) => {
   const {chatId} = req.params
    
   if(!isValidObjectId(chatId)){
      throw new ApiError(400,"Invalid chat id")
   }

   const selectedChat = await Chat.findById(chatId)

   console.log(selectedChat)

   if(!selectedChat){
      throw new ApiError(404,"Chat does not exist")
   }

   if(selectedChat.users.includes(isValidObjectId(req.user?._id))){
      throw new ApiError(404,"User not found in chat")
   }


   const messages = await Message.aggregate([
      {
         $match: {
            chat: selectedChat._id
         }
      },
      ...commonAggregationPipeline(),

      {
         $sort: {
            createdAt: -1
         }

      }
   ])

   return res
      .status(200)
      .json(new ApiResponse(200, messages||[], "Messages fetched successfully"))
})


const createMessage = asyncHandler(async (req, res) => {
   const { chatId } = req.params
   const { content} = req.body

   if (!isValidObjectId(chatId)) {
      throw new ApiError(400, "Invalid chat id")
   }

   const selectedChat = await Chat.findById(chatId)

   if (!selectedChat) {
      throw new ApiError(404, "Chat does not exist")
   }

   if (!selectedChat.users.includes(req.user?._id)) {
      throw new ApiError(404, "User not found in chat")
   }

   const messageData = {
      sender: req.user?._id,
      content,
      chat: chatId
   }

   const createdMessage = await Message.create(messageData)

    await Chat.findByIdAndUpdate(
      chatId, 
      {
         latestMessage: createdMessage._id
      },
      {
         new: true
      }
      )


      // todo :  implement socket.io to send message to chat users

      const resMessage = await Message.aggregate([
         {
            $match: {
               _id: createdMessage._id
            }
         },
         ...commonAggregationPipeline()
      ])

      const receivedMessage =  resMessage[0]

   return res
      .status(201)
      .json(new ApiResponse(201, receivedMessage, "Message sent successfully"))
})


export {
   getAllMessages,
   createMessage
}