import { Router } from "express";
import {
    signUp,
    verifyEmail,
    resendVerificationEmail,
    forgotPasswordRequest,
    resetForgotPassword,
    logIn,
    logOut,
    assignRole,
    getAllUsers,
    getCurrentUser,
    handleSolcialLogin,
    changePassword
   } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import {jwtVerify,verifyPermission} from "../middleware/auth.middleware.js"
import { UserRolesEnum } from "../constant.js";
import passport from "passport";

const router = Router();

// unsecured route
router.route("/signup").post(
   upload.single("profileImage"),
   signUp
   )
router.route("/verify-email/:varificationToken").get(verifyEmail)
router.route("/resend-verification-email").post(resendVerificationEmail)
router.route("/login").post(logIn)
router.route("/forgot-password").post(forgotPasswordRequest)
router.route("/reset-forgot-password/:resetToken").post(resetForgotPassword)





// secured route
router.route("/logout").get(jwtVerify,logOut)
router.route("/getAllUsers").get(jwtVerify,getAllUsers)
router.route("/getCurrentUser").get(jwtVerify,getCurrentUser)
router.route("/assignRole/c/:userId").post(jwtVerify, verifyPermission([UserRolesEnum.ADMIN]), assignRole)
router.route("/changePassword").patch(jwtVerify,changePassword)


// SSO routes

router.route("/google").get(
   passport.authenticate("google", {
     scope: ["profile", "email"],
   }),
   (req, res) => {
     res.send("redirecting to google...");
   }
 );

//  router
//   .route("/auth/google/callback")
//   .get(passport.authenticate("google",{
//       failureRedirect: "http://localhost:5173/login",
//       successRedirect: "http://localhost:5173/home",
//     }));
    

export default router;

