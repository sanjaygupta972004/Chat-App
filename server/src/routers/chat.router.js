import { Router } from "express";

import { accessChat } from "../controllers/chat.controller.js";
import {jwtVerify} from "../middleware/auth.middleware.js"


const router = Router();

router.route("/accessChat").post(jwtVerify,accessChat)




export default router;