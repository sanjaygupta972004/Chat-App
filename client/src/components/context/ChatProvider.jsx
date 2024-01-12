import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  
   const navigate = useNavigate();
 
   const [user, setUser] = useState(null);
 
   useEffect(() => {
     const userDetail = JSON.parse(localStorage.getItem('userInfo'));
    
     if (userDetail) {
       setUser(userDetail);
     }
 
    
     if (!userDetail) navigate('/');

   }, [navigate]); 

   //console.log("user details in chat providder",user);
 
   return (
     <ChatContext.Provider value={{ user }}>
       {children}
     </ChatContext.Provider>
   );
 };


export const useChat = () => useContext(ChatContext);
 