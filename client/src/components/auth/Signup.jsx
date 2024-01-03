import React from 'react'
import { useState } from 'react'
import { 
     FormControl,
     FormLabel,
     Input,
     Button, 
     InputGroup,
     InputRightElement,
     VStack 
      } from "@chakra-ui/react"

const Signup = () => {

   const[fullName, setFullName] = useState("")
   const[email, setEmail] = useState("")
   const[password, setPassword] = useState("")
   const[confirmPassword, setConfirmPassword] = useState("")
   //const[pic, setPic] = useState("")
   const[picLoading, setPicLoading] = useState(false)
   const[show, setShow] = useState(false)
   
   const handleClick = () => setShow(!show)

   // const postDetails = (pics) => {

   // }

   const submitHandler = async () => {

   }
   
  return (
   <VStack spacing={"15px"} border={3}>
      <FormControl id = "fullName" isRequired>
         <FormLabel>fullName</FormLabel>
         <Input
            placeholder="Enter your fullName" 
             type="text"
             onChange= {(e)=>setFullName(e.target.value)}
          />
       </FormControl>

       <FormControl id = "email" isRequired>
         <FormLabel>Email</FormLabel>
         <Input
             placeholder="Enter Email" 
             type="text"
             onChange= {(e)=>setEmail(e.target.value)}
          />
       </FormControl>
       
       <FormControl id = "password" isRequired>
         <FormLabel>Password</FormLabel>
         <InputGroup size= "md">
         <Input
            placeholder="Enter Password"
             type= {show ? "text" : "password"}
             onChange= {(e)=>setPassword(e.target.value)}
          />
            <InputRightElement width="4.5rem">
               <Button h="1.75rem" size="sm" onClick={handleClick}>
               {show ? "Hide" : "Show"}
               </Button>
            </InputRightElement>
          </InputGroup>
       </FormControl>

       <FormControl id = "confirmPassword" isRequired>
         <FormLabel>Confirm Password</FormLabel>
         <InputGroup size= "md">
         <Input
            placeholder="Confirm Password"
             type= {show ? "text" : "password"}
             onChange= {(e)=>setConfirmPassword(e.target.value)}
          />
            <InputRightElement width="4.5rem">
               <Button h="1.75rem" size="sm" onClick={handleClick}>
               {show ? "Hide" : "Show"}
               </Button>
            </InputRightElement>
          </InputGroup>
       </FormControl>

       {/* <FormControl id = "pic" isRequired>
         <FormLabel>Profile Picture</FormLabel>
         <Input
             placeholder="Enter Profile Picture" 
             type="file"
             onChange= {(e)=>postDetails(e.target.files[0])}
          />
       </FormControl> */}
       <Button
        colorScheme="blue"
        width="100%"
        className="mt-4"
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>

   </VStack>
  )
}

export default Signup