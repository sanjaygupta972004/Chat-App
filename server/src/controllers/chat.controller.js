import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Chat} from "../models/chat.model.js"
import { User } from "../models/user.model.js";



const accessChat = asyncHandler(async (req,res)=>{
   const {userId} = req.body
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

   isChat = await User.populate(isChat, {
      path:"latestMessage.sender",
      select:"fullName profileImage email "
   })

   //console.log(isChat[0])

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

   const existingChat = await Chat.findById(groupChat._id).populate("users", "-password").populate("groupAdmin", "-password");

   // console.log(existingChat);

   if (!existingChat) {
      throw new ApiError(500, "Something went wrong while creating chat");
   }

   return res
      .status(201)
      .json(new ApiResponse(201, existingChat, "Group chat created"));
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

   if (!updatedChat) {
      throw new ApiError(500, "Something went wrong while renaming chatGroup");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, updatedChat, "chatGroup renamed"));
});



const addMemberToGroupChat = asyncHandler(async (req, res) => {
  
   const { chatId, userId } = req.body;

   if (!chatId || !userId) {
      throw new ApiError(400, "Please provide chatId and userId");
   }

   const updatedChatGroup = await Chat.findByIdAndUpdate(
      chatId,
     // { $addToSet: { users: userId } },  // Using $addToSet to avoid duplicates
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
      .json(new ApiResponse(200, deletedChat, "chatGroup deleted"));

});
export {
   accessChat,
   fetchChat,
   createGroupChat,
   reNameGroupChat,
   addMemberToGroupChat,
   deleteGroupChat
}



