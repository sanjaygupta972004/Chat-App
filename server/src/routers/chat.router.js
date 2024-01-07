import { Router } from "express";

import {
      accessChat,
      fetchChat, 
      createGroupChat,
      reNameGroupChat,
      deleteGroupChat,
      addMemberToGroupChat
   } from "../controllers/chat.controller.js";
import {jwtVerify} from "../middleware/auth.middleware.js"


const router = Router();

router.route("/accessChat").post(jwtVerify,accessChat)
router.route("/fetchChat").get(jwtVerify,fetchChat)
router.route("/createGroupChat").post(jwtVerify,createGroupChat)
router.route("/addMemberToGroupChat").post(jwtVerify,addMemberToGroupChat)
router.route("/reNameGroupChat").post(reNameGroupChat)
router.route("/deleteGroupChat").post(deleteGroupChat)





export default router;