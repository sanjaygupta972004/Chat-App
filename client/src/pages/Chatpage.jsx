import React from 'react'
import { useChat} from "../components/context/ChatProvider.jsx" 
import SideDrawer from '../components/chatcomponents/SideDrawer.jsx'
import MyChats from '../components/chatcomponents/MyChats.jsx'
import ChatBox from '../components/chatcomponents/ChatBox.jsx'
import { 
  Box,
 } from '@chakra-ui/react'

const Chatpage = () => {
  const {user} = useChat();
  return (
    <div className=' w-screen'>

    {user && <SideDrawer/>}
    <Box
    display ='flex'
    justifyContent = "space-between"
    p ="8px"
    w = "100%"
    h = "92vh"
    >
      { user && <MyChats/>}
      { user && <ChatBox/>}
    </Box>



    </div>
 
  )
}

export default Chatpage