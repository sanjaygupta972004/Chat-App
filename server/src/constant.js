 export const DB_NAME = 'chat-App';

 export const TEMPORARY_EXPIRY_TOKEN_TIME =  30*60*1000; // 30 minutes

export const UserRolesEnum = {
   ADMIN: "ADMIN",
   USER: "USER",

};

export const AvailableUserRoles = object.values(UserRolesEnum);   



export const UserLoginType = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
};

export const AvailableLoginType = object.values(UserLoginType);



