import { Router } from "express";
import { signUp,logIn} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();


router.route("/signup").post(
   upload.fields([
      {name:"profileImage",maxCount:1},
      {name:"coverImage",maxCount:1}
   ]),
   signUp
   )

router.route("/login").post(logIn)

export default router;

