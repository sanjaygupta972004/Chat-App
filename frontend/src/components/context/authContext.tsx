import React, { createContext, useContext, useState } from "react";
import { UserResponseInterface } from "../interface/index";
import { LocalStorage } from "../utils/Localstorage";

type ChildrenProps = {
   children: React.ReactNode
}

export interface ContextProps {
    User: UserResponseInterface | null;
    token : string | null;
    Logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<UserResponseInterface | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<ContextProps|null>(null);

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children}:ChildrenProps) => {
   const [user, setUser] = useState<UserResponseInterface | null>(null);
   const [token, setToken] = useState<string | null>(null);

   console.log(user)

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
     }}>
         {children}
     </AuthContext.Provider>
   );
}

export { useAuthContext, AuthProvider };
