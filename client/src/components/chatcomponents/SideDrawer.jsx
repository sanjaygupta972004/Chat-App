import React from 'react'
import { useState } from 'react'
import { IoSearch} from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { FaCircleChevronDown } from "react-icons/fa6";

import { useChat } from '../context/ChatProvider.jsx';
import ProfileModel from './ProfileModel.jsx';
import { useNavigate } from 'react-router-dom';


import {
      Box,
      Button,
      Tooltip,
      Text,
      Menu,
      MenuButton,
      Avatar,
      MenuList,
      MenuItem,
      MenuDivider,
      
   } from '@chakra-ui/react';

   
const SideDrawer = () => {
   const {user} = useChat();
  // console.log(user);
   const navigate = useNavigate();
;
   const[search, setSearch] = useState('');
   const[searchResults, setSearchResults] = useState([]);
   const[loading, setLoading] = useState(false);
   const[loadingChat, setLoadingChat] = useState(false);

   const logoutHandler = ()=>{
      localStorage.removeItem("userInfo")
      navigate("/")
   }

  return (
    <>
    <Box
        display = "flex"
        justifyContent =  "space-between"
        alignItems = "center"
         p = "5px 5px 3px 3px" 
         w = "100%"
         borderWidth = "5px"  
         bg = "white"   
         
     >
 
      <Tooltip label = "Search Users to Chat" hasArrow placement='bottom'>
         <Button variant = "ghost" className='gap-2 flex'>
            <IoSearch size = "22px" className='text-slate-600'/>
             <Text  fontFamily= "sans-serif" 
              className=' text-slate-700 text-[15px] lg:text-xl' >Search User
              </Text>
         </Button>
      </Tooltip>
  
       <Text fontFamily="sen-serif"  className=" text-slate-700 text-[15px] lg:text-xl">
        Chat_Mingle
        </Text>
      
        <div>
         <Menu>
            <MenuButton p = "15px 7px 0px 0px"  >
               <GoBell size = "22px" className='text-slate-800 mr-2' />
            </MenuButton>

         </Menu>

         <Menu >
            <MenuButton  as = {Button} rightIcon={<FaCircleChevronDown/>}
             >
               <Avatar
                  
                  size = "sm"
                  name = {user?.fullName}
                  src =  {user?.profileImage}
                  className = " mr-2"
               />
            </MenuButton>
            <MenuList>
               <MenuItem>
                  <ProfileModel user={user}>
                  </ProfileModel>
               </MenuItem>
               <MenuDivider/>
               <MenuItem onClick={logoutHandler}>logOut
               </MenuItem>
            </MenuList>
         </Menu>

        </div>
    </Box>
    

    </>
  )
}

export default SideDrawer