import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import  Jwt  from "jsonwebtoken";

export const jwtVerify = asyncHandler(async (req, _, next) => {
   try {
      //console.log(req.headers);

      const token = req.cookies.accessToken || req.header["Authorization"]?.replace("Bearer ", "").trim();
      //  console.log(token);

      if (!token) {
         throw new ApiError(401, "Access token not found");
      }

      const decoded = Jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

      if (!decoded) {
         throw new ApiError(401, "unauthorized");
      }

      const user = await User.findById(decoded._id).select("-password -refreshToken -emailVerificationToken -passwordResetToken -emailVerificationTokenExpiry -passwordResetTokenExpiry -refreshTokenExpiry");
      if (!user) {
         throw new ApiError(401, "User not found");
      }
      req.user = user;
      next();
      
   } catch (error) {
      console.log(error.message);
      throw new ApiError(401, "unauthorized user");
   }
})

export const verifyPermission = (roles=[]) => 
    asyncHandler(async (req, _, next) => {
      if (!req.user?._id) {
         throw new ApiError(401, "unauthorized user");
      }
      if (!roles.includes(req.user?.role)) {
        throw new ApiError(403, "You don't have permission to perform this action");
      }
      next();
   })


