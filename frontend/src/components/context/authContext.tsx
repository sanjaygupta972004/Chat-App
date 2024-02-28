import React, { createContext, useContext, useState } from "react";
import { UserResponseInterface } from "../interface/index";


type ChildrenProps = {
   children: React.ReactNode
}

 export  interface LoggedUserInterface extends UserResponseInterface{
    accessToken: string;
    isLoggedUser: UserResponseInterface;
 }



export interface ContextProps {
    User: UserResponseInterface | null;
    isLoggedUser: LoggedUserInterface | null;
    token : string | null;
    Logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<UserResponseInterface | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUserInterface | null>>;
}

const AuthContext = createContext<ContextProps|null>(null);

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children}:ChildrenProps) => {
   const [user, setUser] = useState<UserResponseInterface | null>(null);
   const [token, setToken] = useState<string | null>(null);
   const [isLoggedUser, setIsLoggedUser] = useState<LoggedUserInterface | null>(null);

//    console.log(user)
//    console.log("token",token)
//    console.log("LoggedUser",isLoggedUser)

   const Logout = () => {
      console.log("Logout");
   };

 return (
     <AuthContext.Provider value={{
             User: user,
             token: token,
             Logout: Logout,
             setUser: setUser,
             setToken: setToken,
             setLoggedUser: setIsLoggedUser,
             isLoggedUser: isLoggedUser
     }}>
             {children}
     </AuthContext.Provider>
 );
}

export { useAuthContext, AuthProvider };
