 
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
 LoginType : string;
 isEmailVarified : boolean;
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
 status : number
}