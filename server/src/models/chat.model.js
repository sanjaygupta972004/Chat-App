import mongoose,{ Schema } from "mongoose"

const chatSchema = new Schema(
   { 
      chatName: {
         type: String, 
         required: true
      },
      isGroupChat: {
         type: Boolean,
          default: false
      },
      participants: [{ 
            type: Schema.Types.ObjectId,
             ref: "User"
            }
      ],
      latestMessage: {
         type : Schema.Types.ObjectId,
         ref : "Message"
      },
      groupAdmin: {
         type : Schema.Types.ObjectId,
         ref : "User"
      }
   },
     {timestamps: true}
   )

 export const Chat = mongoose.model("Chat",chatSchema)