import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import {User}  from './models/user.model.js';
import { ApiError } from './utils/ApiError.js';
import dotenv from 'dotenv'

dotenv.config({
   path: "./.env"
})
import {
   UserLoginType,
   UserRolesEnum,
} from "./constant.js"



try {
   passport.serializeUser((user,next)=>{
      next(null,user?._id)
   })

   passport.deserializeUser(async (id,next)=> {
      try {
         const user = await User.findById(id)
         if(user) return next(null,user)
         else return next(new ApiError(404,"User not found"),null)
         
      } catch (error) {
         next(new ApiError(500 ,"something went wrong while deserialize user"),null)
      }
   })


passport.use(
   new GoogleStrategy(
         {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"],
         
         },
         async(accessToken, refreshToken, profile, next) => {
            console.log(profile)
            
           const user =  await User.findOne({email:profile._json.email})
             if(user){
             if(user.loginType !== loginType.GOOGLE){
                return next(new ApiError(400,
                   "you have already resistered with this email, please login with your email and password"
                  ),null)
             
         } else if (user && user.isEmailVerified === false) {
            return next(new ApiError(400, "Please verify your email"), null);
         } else {
            next(null, user);
         }
         
      } else {
         const newUser =  await User.create({
            username: profile._json.email.split("@")[0],
            fullNmae: profile._json.email.split("@")[0].toUpperCase(),
            email: profile._json.email,
            profileImage: profile._json.picture,
            UserLoginType: UserLoginType.GOOGLE,
            isEmailVerified: true,
            role: UserRolesEnum.USER,
         });

         if(!newUser){
          return next(new ApiError(500,"something went wrong while creating user"),null)
         }else{
            next(null,newUser)
         }
   
      }
   }

   )
)

   
} catch (error) {
   console.error(error.message)
   new ApiError("Error during passport configuration")
}

