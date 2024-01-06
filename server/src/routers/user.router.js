import { Router } from "express";
import {
    signUp,
    logIn,
    getAllUsers
   } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import {jwtVerify} from "../middleware/auth.middleware.js"

const router = Router();


router.route("/signup").post(
   upload.fields([
      {name:"profileImage",maxCount:1},
      {name:"coverImage",maxCount:1}
   ]),
   signUp
   )

router.route("/login").post(logIn)
router.route("/getUser").get(jwtVerify,getAllUsers)

export default router;

