import React from 'react'
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
  return (
    <>
    <Container maxW= "xl" centerContent >
      <Box
       d= "flex"
       justifyContent= "center"
       bg="white"
       w= "100%"
       m= "40px 0 15px 0"
       p={2}
       borderRadius= "md"
       borderWidth= "2px"
       >
        <Text fontSize="2xl" fontFamily="-moz-initial" color="black">Lorem ipsum do</Text>
      </Box>
      <Box
        d= "flex"
        justifyContent= "center"
        bg="white"
        w= "100%"
        m= "40px 0 15px 0"
        p={2}
        borderRadius= "md"
        borderWidth= "2px"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
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