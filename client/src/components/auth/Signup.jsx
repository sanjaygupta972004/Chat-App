import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { 
     FormControl,
     FormLabel,
     Input,
     Button, 
     InputGroup,
     InputRightElement,
     VStack ,
     useToast
      } from "@chakra-ui/react"


const Signup = () => {
   const toast = useToast()
   const navigate = useNavigate()

   const[fullName, setFullName] = useState("")
   const[username, setUsername] = useState("")
   const[email, setEmail] = useState("")
   const[password, setPassword] = useState("")
   const[coverImage, setCoverImage] = useState("")
   const[profileImage, setProfileImage] = useState("")
   const[loading, setLoading] = useState(false)

   const[show, setShow] = useState(false)
   const handleClick = () => setShow(!show)

   const handleProfileImageChange = (e) => {
      setProfileImage(e.target.files[0])
   }

   const handleCoverImageChange = (e) => {
      setCoverImage(e.target.files[0])
   }


   
const handleKeyDown = (e) => {
   if (e.key === "ArrowDown" || e.key === "ArrowUp") {
     e.preventDefault(); 
     const formElements = document.querySelectorAll(
       "input:not([type='hidden']), select, textarea, button"
     );
     const currentIndex = Array.from(formElements).findIndex(
       (element) => element === document.activeElement
     );
 
     let nextIndex;
     if (e.key === "ArrowDown") {
       nextIndex = (currentIndex + 1) % formElements.length;
     } else if (e.key === "ArrowUp") {
       nextIndex = (currentIndex - 1 + formElements.length) % formElements.length;
     }
 
     formElements[nextIndex].focus();
   }
 };
 



   const submitHandler = async () => {
   setLoading(true)

   if(!fullName || !username || !email || !password || !profileImage || !coverImage){
      toast({
         title: "Please fill all the fields",
         status: "error",
         duration: 2000,
         isClosable: true,
         position: "top-right"
       })
      setLoading(false)
      return
   }

   if(fullName.length < 3){
      toast({
         title: "Full Name should be atleast 3 characters long",
         status: "error",
         duration: 2000,
         isClosable: true,
         position: "top-right"
       })
       setLoading(false)
      return
   }
   if(!email.includes("@")){
      toast({
         title: "Please enter a valid email",
         status: "error",
         duration: 2000,
         isClosable: true,
         position: "top-right"
       })
       setLoading(false)
      return
   }

   if(!email.includes(".com")){
      toast({
         title: "Please enter a valid email",
         status: "error",
         duration: 2000,
         isClosable: true,
         position: "top-right"
       })
       setLoading(false)
      return
      }
  
   if(password.length < 6){
      toast({
         title: "Password should be atleast 6 characters long",
         status: "error",
         duration: 2000,
         isClosable: true,
         position: "top-right"
       })
       setLoading(false)
      return
   }

   const data = new FormData()
   data.append("profileImage", profileImage)
   data.append("coverImage", coverImage)
   data.append("fullName", fullName)
   data.append("email", email)
   data.append("password", password)
   data.append("username", username)

  // console.log("FormData:", data);

    try {
      
      const response = await axios.post("http://localhost:5000/api/v1/users/signup", data)

      const responseData =  response.data.data;
      
       localStorage.setItem("userInfo", JSON.stringify(responseData));
       toast({
         title: "Account Created Successfully",
         status: "success",
         duration: 5000,
         isClosable: true,
       })
   
         setFullName("")
         setUsername("")
         setEmail("")
         setPassword("")
         setCoverImage("")
         setProfileImage("")
         setLoading(false)
         navigate("/chat");


   } catch (error) {
      console.error(error.message)
      toast({
         title: "Something went wrong while creating account",
         status: "error",
         duration: 3000,
         isClosable: true,
         position: "top-right"
       })
         setLoading(false)
   }
}
  
  return (
   <VStack spacing={"8px"} >
      <FormControl id = "fullName" isRequired>
         <FormLabel>Full Name</FormLabel>
         <Input
            placeholder="Enter your fullName" 
             type="text"
             onChange= {(e)=>setFullName(e.target.value)}
             onKeyDown={handleKeyDown}
          />
       </FormControl>
       <FormControl id = "username" isRequired>
         <FormLabel>User Name</FormLabel>
         <Input
            placeholder="Enter Username" 
             type="text"
             onChange= {(e)=>setUsername(e.target.value)}
             onKeyDown={handleKeyDown}
          />
       </FormControl>

       <FormControl id = "email" isRequired>
         <FormLabel>Email</FormLabel>
         <Input
             placeholder="Enter Email" 
             type="text"
             onChange= {(e)=>setEmail(e.target.value)}
             onKeyDown={handleKeyDown}
          />
       </FormControl>
       
       <FormControl id = "password" isRequired>
         <FormLabel>Password</FormLabel>
         <InputGroup size= "md">
         <Input
            placeholder="Enter Password"
             type= {show ? "text" : "password"}
             onChange= {(e)=>setPassword(e.target.value)}
             onKeyDown={handleKeyDown}
          />
            <InputRightElement width="4.5rem">
               <Button h="1.75rem" size="sm" onClick={handleClick}>
               {show ? "Hide" : "Show"}
               </Button>
            </InputRightElement>
          </InputGroup>
       </FormControl>

       <FormControl id = "profileImage" isRequired>
         <FormLabel>Profile Image</FormLabel>
         <Input
             p="6px"
             placeholder="Enter Profile Picture" 
             type="file"
             onChange= {handleProfileImageChange}
             onKeyDown={handleKeyDown}
          />
       </FormControl>
       <FormControl id = "coverImage" >
         <FormLabel>Cover Image</FormLabel>
         <Input
             p="6px"
             placeholder="Enter Cover Picture" 
             type="file"
             onChange= {handleCoverImageChange}
             onKeyDown={handleKeyDown}
          />
       </FormControl>
       <Button
        colorScheme="blue"
        width="100%"
        className="mt-2 hover:bg-blue-700 hover:text-gray-100"
         onClick={submitHandler}
         isLoading={loading}
      >
        Sign Up
      </Button>

   </VStack>
  )
}

export default Signup