import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Chat} from "../models/chat.model.js"
import { User } from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";

const commonAggregationPipeline = () => {
   return [
      {
         $lookup: {
            from: "users",
            localField: "users",
            foreignField: "_id",
            as: "users",
            pipeline: [
               {
                  $project: {
                     forgotPasswordToken: 0,
                     forgotPasswordTokenExpiry: 0,
                     emailVerificationToken: 0,
                     emailVerificationTokenExpiry: 0,
                     isEmailVerified: 0,
                     password: 0,
                     coverImage: 0,
                  }
               }
            ]
         }
      },
      {
         $lookup: {
            from: "messages",
            localField: "latestMessage",
            foreignField: "_id",
            as: "latestMessage",
            pipeline: [
               {
                  $lookup: {
                     from: "users",
                     localField: "sender",
                     foreignField: "_id",
                     as: "sender",
                     pipeline: [
                        {
                           $project: {
                              fullName: 1,
                              profileImage: 1,
                              email: 1,
                              username: 1
                           }
                        }
                     ]
                  }
               },
               {
                  $addFields: {
                     sender: { $first: "$sender"}
                  }
               }
            ]
         }
      },
      {
         $addFields: {
      
            latestMessage: { $first: "$latestMessage" }
         }
      }
   ];
};



const createOrGetOneOneChat = asyncHandler(async (req, res) => {
   const { receiverId } = req.params;

   if (!receiverId) {
         throw new ApiError(400, "Please provide receiverId");
   } 
   const senderId = req.user?._id;

   const verifyReceiverId =  new mongoose.Types.ObjectId(receiverId);

   const isUser = await User.findById(verifyReceiverId);

   if(!isUser){
      throw new ApiError(404,"User not available to chat")
   } 

   if(!verifyReceiverId){
      throw new ApiError(400,"senderId is not valid")
   }


   if(verifyReceiverId === senderId){
      throw new ApiError(400,"You cannot chat with yourself")
   }



   const isChat = await Chat.aggregate([
       {
           $match: {
               isGroupChat: false,
               users: {
                   $all: [verifyReceiverId, senderId]
               }
           }
       },
         ...commonAggregationPipeline()
   ]);

  

   if (isChat.length) {
       return res
       .status(200)
       .json(new ApiResponse(200, isChat[0], "Chat found"));
   } 

   const chatData = {
      chatName: "one to one chat",
      isGroupChat: false,
      users: [verifyReceiverId, senderId],
      admin: senderId
   }

   const newChat = await Chat.create(chatData);

   console.log(newChat);

   const chatDetails =  await Chat.aggregate([
      {
         $match: {
            _id: newChat._id
         },
         ...commonAggregationPipeline()
      }
   ]);

   return res
      .status(201)
      .json(new ApiResponse(201, chatDetails[0], "Chat created"));
   
});



const fetchChat = asyncHandler(async (req,res)=>{
   let chat = await Chat.find(
      {
         users:{
            $elemMatch:{$eq:req.user._id}
         }
      }
      ).populate("users","-password")
      .populate("latestMessage")
      .populate("groupAdmin",)
      .sort({updatedAt:-1})

      chat = await User.populate(chat, {
         path:"latestMessage.sender",
         select:"fullName profileImage email "
      })

      if(chat.length === 0){
         return res
         .status(200)
         .json(new ApiResponse(200,[],"No chat found"))
      }

    return res
       .status(200)
       .json(new ApiResponse(200,chat,"all chat of user"))
})


const createGroupChat = asyncHandler(async (req, res) => {
   const { users, chatName } = req.body;

   if (!users || !chatName) {
      throw new ApiError(400, "Please provide all fields");
   }

   if (users.length < 2) {
      throw new ApiError(400, "More than two users required for group chat");
   }

   // Assuming 'users' is already an array of user IDs or objects
   const usersArray = Array.isArray(users) ? users : [users]; // Convert to array if not already


   usersArray.push(req.user);

  // console.log(usersArray);

   const chatData = {
      chatName,
      isGroupChat: true,
      users: usersArray, 
      groupAdmin: req.user
   };

   const groupChat = await Chat.create(chatData);

     const existingChat = await groupChat.save();

   const chatDetails = await Chat.findById(existingChat._id).populate("users", "-password").populate("groupAdmin", "-password");

    console.log(chatDetails);

   if (!chatDetails) {
      throw new ApiError(500, "Something went wrong while creating chat");
   }

   return res
      .status(201)
      .json(new ApiResponse(201, chatDetails, "Group chat created"));
});


const addMemberToGroupChat = asyncHandler(async (req, res) => {
  
   const { chatId, userId } = req.body;

   if (!chatId || !userId) {
      throw new ApiError(400, "Please provide chatId and userId");
   }

   const chat = await Chat.findById(chatId);
   console.log(chat);  // Debugging log

   const updatedChatGroup = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } },  // Using $addToSet to avoid duplicates
      { new: true }
   ).populate("users", "-password").populate("groupAdmin", "-password");

   console.log(updatedChatGroup);  // Debugging log

   if (!updatedChatGroup) {
      throw new ApiError(500, "Something went wrong while adding member");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, updatedChatGroup, "Member added"));
});


const reNameGroupChat = asyncHandler(async (req, res) => {
   const { chatId, chatName } = req.body;

   if (!chatId || !chatName) {
      throw new ApiError(400, "Please provide all fields");
   }

   const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
   ).populate("users", "-password").populate("groupAdmin", "-password");

   //console.log(updatedChat);  // Debugging log

   if (!updatedChat) {
      throw new ApiError(500, "Something went wrong while renaming chatGroup");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, updatedChat, "chatGroup renamed"));
});



const deleteGroupChat = asyncHandler(async (req, res) => {
   const { chatId } = req.body;

   if (!chatId) {
      throw new ApiError(400, "Please provide chatId");
   }

   const deletedChat = await Chat.findByIdAndDelete(chatId);

   if (!deletedChat) {
      throw new ApiError(500, "Something went wrong while deleting chatGroup");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, {}, "chatGroup deleted"));

});




export {
   createOrGetOneOneChat,
   fetchChat,
   createGroupChat,
   reNameGroupChat,
   addMemberToGroupChat,
   deleteGroupChat
}



