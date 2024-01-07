import React from 'react'
import { useState } from 'react'
import { IoSearch} from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { FaCircleChevronDown } from "react-icons/fa6";

import { useChat } from '../context/ChatProvider.jsx';

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
   const userData = user?.data;

   const[search, setSearch] = useState('');
   const[searchResults, setSearchResults] = useState([]);
   const[loading, setLoading] = useState(false);
   const[loadingChat, setLoadingChat] = useState(false);

  return (
    <>
    <Box
       display= "flex"
       justifyContent = "space-between"
       alignItems = "center"
         p = "5px 10px 5px 7px" 
         w = "100%"
         borderWidth = "6px"  
         bg = "white"   
     >
      <Tooltip label = "Search Users to Chat" hasArrow placement='bottom'>
         <Button variant = "ghost" className='gap-3'>
            <IoSearch size = "25px" className='text-slate-600'/>
             <Text d ={{base:"node",md: "flex"}} fontFamily= "sans-serif" fontSize ="md"
              className=' text-slate-600 p-3' >Search User
              </Text>
         </Button>
      </Tooltip>
       <Text fontSize="xl" fontFamily="sen-serif"  className=" text-slate-700">
        Chat_Mingle
        </Text>
        <div>
         <Menu>
            <MenuButton p = "5px"  >
               <GoBell size = "25px" className='text-slate-800 mr-3' />
            </MenuButton>

         </Menu>

         <Menu>
            <MenuButton as = {Button} rightIcon={<FaCircleChevronDown/>}>
               <Avatar
                  size = "sm"
                  name = {userData?.fullName}
                  src = {userData?.profileImage}
                  className = "mr-3"
               />
            </MenuButton>
            <MenuList>
               <MenuItem>my profileImage</MenuItem>
               <MenuDivider/>
               <MenuItem>Logout</MenuItem>
            </MenuList>
         </Menu>

        </div>
    </Box>
    

    </>
  )
}

export default SideDrawer