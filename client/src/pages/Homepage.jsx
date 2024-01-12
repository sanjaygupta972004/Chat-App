import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
  
} from "@chakra-ui/react"
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

const Homepage = () => {

  const navigate = useNavigate();


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if(user){
       navigate('/chat');
    } 
 },[navigate]);

  return (
    <>
    <Container maxW= "xl" centerContent >
      <Box
       d= "flex"
       justifyContent= "center"
       bg="white"
       w= "100%"
       m= "50px 0 5px 0"
       p={1}
       borderRadius= "lg"
       borderWidth= "2px"
       >
        <Text fontSize="25px" fontFamily="sen-serif"  className="text-center text-slate-700">
        "Converse with Social Pulse"
        </Text>

      </Box>
      <Box
        d= "flex"
        justifyContent= "center"
        bg="white"
        w= "100%"
        m= "15px 0 10px 0"
        p={2}
        borderRadius= "md"
        borderWidth= "2px"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="5px">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </>
 
  )
}
export default Homepage