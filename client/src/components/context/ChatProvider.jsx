import React, { useEffect } from 'react';
import { createContext,useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

export const ChatProvider = ({children})=>{

   const history = useHistory();

   const[user,setUser] = useState(null);

   useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('userInfo'));
      setUser(user);
      if(!user){
         history.push('/');
      } 
   },[history]);


      return (
         <ChatContext.Provider value={{user}}>
               {children}
         </ChatContext.Provider>
      )
} 

export const useChat = ()=> useContext(ChatContext);