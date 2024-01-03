import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import dotenv from "dotenv";
dotenv.config({
  path: "./.env"

});

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY , 
  api_secret: process.env.API_SECRET
});

const upLoadOnCloudinary = async function(localFilePath) {
  try {
      if (!localFilePath) return null;

      // upload file to Cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
      });

      //console.log("Cloudinary response:", response); // log Cloudinary response for debugging

      // file is successfully uploaded
      fs.unlinkSync(localFilePath); // remove locally saved temporary file path
      return response;

  } catch (error) {
      console.error("Error uploading to Cloudinary:", error.message); // log the error for debugging

      if (fs.existsSync(localFilePath)) {    // check if file exists before attempting to delete
          fs.unlinkSync(localFilePath);     // remove locally saved temporary file path
      }
      return null;
  }
}



export {upLoadOnCloudinary }