import { Router } from "express";
import {
    signUp,
    verifyEmail,
    resendVerificationEmail,
    forgotPasswordRequest,
    resetPassword,
    logIn,
    logOut,
    getUserRole,
    getAllUsers
   } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import {jwtVerify} from "../middleware/auth.middleware.js"

const router = Router();

// unsecured route
router.route("/signup").post(
   upload.fields([
      {name:"profileImage",maxCount:1},
      {name:"coverImage",maxCount:1}
   ]),
   signUp
   )
router.route("/verify-email/:varificationToken").get(verifyEmail)
router.route("/login").post(logIn)
router.route("/resend-verification-email").post(resendVerificationEmail)
router.route("/forgot-password").post(forgotPasswordRequest)
router.route("/reset-password/:resetPasswordToken").get(resetPassword)
router.route("/get-user-role/c/:_id").post(jwtVerify,getUserRole)



// secured route
router.route("/logout").get(jwtVerify,logOut)
router.route("/getUser").get(jwtVerify,getAllUsers)

export default router;

