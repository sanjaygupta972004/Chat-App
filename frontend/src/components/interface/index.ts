 
import { AxiosResponse } from 'axios';


export interface UserResponseInterface {
 _id: string;
 coverImage: string;
 profileImage: string;
 fullName: string;
 username: string;
 email: string;
 createdAt: string;
 updatedAt: string;
 isEmailVerified : boolean;
 role: string;
}

export interface AxiosResponseInterface extends AxiosResponse {
   data : any;
   message: string;
   statusCode : number;
   success: boolean
   user: UserResponseInterface;
}

export interface AxiosErrorInterface{
message : string;
statusCode : number;
success: boolean;
data : any;
}