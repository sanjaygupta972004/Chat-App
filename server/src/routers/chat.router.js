import { Router } from "express";

import {
     createOrGetOneOneChat,
      fetchChat, 
      createGroupChat,
      reNameGroupChat,
      deleteGroupChat,
      addMemberToGroupChat
   } from "../controllers/chat.controller.js";
import {jwtVerify} from "../middleware/auth.middleware.js"


const router = Router();

router.use(jwtVerify)

router.route("/createOrGetOneOneChat/c/:receiverId").get(createOrGetOneOneChat)
router.route("/fetchChat").get(jwtVerify,fetchChat)
router.route("/createGroupChat").post(jwtVerify,createGroupChat)
router.route("/addMemberToGroupChat").post(jwtVerify,addMemberToGroupChat)
router.route("/reNameGroupChat").post(reNameGroupChat)
router.route("/deleteGroupChat").post(deleteGroupChat)





export default router;