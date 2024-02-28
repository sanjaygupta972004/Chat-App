import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { LocalStorage } from "@/utils/Localstorage";
import axios from "axios";
import { isAxiosError } from "axios";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
type Error = {
  email: string;
  server: string;

}

export const ResendEmailVerification = () => {
  const [email, setEmail] = useState<string>("");
  const[restoreEmail, setRestoreEmail] = useState<string>("");
  const [error ,setError] = useState<Error>({
    email: "",
    server: "",
  });
 const [loading, setLoading] = useState<boolean>(false);


  const user = LocalStorage.get("user");
  
   const navigate = useNavigate();

   useEffect(() => {
    if(user?.email) {
      setRestoreEmail(user.email);
    }else {
      navigate("/signup");
    }
   },[]);

 
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(email === "") {
      setError({email: "Email is required", server: ""});
      setLoading(false);
      return;
    } else if(email !== restoreEmail) {
      setError({email: "Pls Enter Same Email", server: ""});
      setLoading(false);
      return;
    }

    try {
      
      const response = await axios.post("/api/v1/users/resend-verification-email", {email});
      console.log(response);
       if(response.data.statusCode === 200) {
       toast.success(response.data.message);  
       }
      setEmail("");
      navigate("/emailVerification")
    } catch (error) {
      if(isAxiosError(error)) {
        setError({email: "", server: error.response?.data.message});
     
      }else {
        setError({email: "", server: "Something went wrong"});
      
      }
    }finally {
      setLoading(false);
    }
 

  };

  return (
    <div className="bg-[#b16c8e] min-h-screen flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg md:w-full max-w-md">
        <h1 className="text-2xl font-mono underline leading-tight mb-4">Resend Email For Velidation</h1>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium font-mono text-xl">Email</label>
              <Input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full text-xl font-serif"
              />
             {error?.email &&  <p className="text-red-500 leading-tight font-mono text-xl pt-1">{error.email}</p>}
            </div>
            <Button 
              variant={"default"}
              type="submit"
              className="w-full h-[50px] text-2xl font-serif hover:bg-[#f0f0f0] hover:text-[#070806] transition-all duration-300 ease-in-out" >
              {loading ? "Submiting..." : "Submit"}
            </Button>
            {error?.server && <p className="text-red-500 leading-tight font-mono text-xl pt-1">{error.server}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResendEmailVerification;
