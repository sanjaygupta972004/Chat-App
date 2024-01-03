import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();


router.route("/signup").post(
   upload.fields([
      {name:"profileImage",maxCount:1},
      {name:"coverImage",maxCount:1}
   ]),
   signUp
   )

export default router;

