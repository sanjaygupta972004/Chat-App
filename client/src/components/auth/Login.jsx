import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { 
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast

} from '@chakra-ui/react'

const Login = () => {
const toast = useToast()
const navigate = useNavigate()

const[email, setEmail] = useState("")
const[password, setPassword] = useState("")
const[show, setShow] = useState(false)
const[loading, setLoading] = useState(false)

const handleClick = () => setShow(!show)

const fieldData = { email, password}

//console.log(fieldData)


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

if(!email || !password){
  setLoading(false)
  toast({
    title: "Please fill all fields",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right"
  })
  setLoading(false)
  return
}


try {
  const res = await axios.post("http://localhost:5000/api/v1/users/login", fieldData)
  localStorage.setItem("userInfo", JSON.stringify(res.data.data.isLoggedUser))
  //console.log(res.data.data.isLoggedUser)
  setEmail("")
  setPassword("")
  toast({
    title: "Login Successful",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top-right"
  })

  setLoading(false)

  
} catch (error) {
  console.error(error.message) 
  toast({
    title: "Login Failed",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right"
  })

  setLoading(false)
}

}

  return (
    <VStack spacing="10px" >
   
    <FormControl id = "email" isRequired>
    <FormLabel >Email</FormLabel>
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

  <Button
        colorScheme="blue"
        width="100%"
        className="mt-2 hover:bg-blue-700 hover:text-gray-100"
        onClick={submitHandler}
        isLoading={loading}
      
      >
        Log in
      </Button>

      <Button
        colorScheme="red"
        width="95%"
        className="mt-1"
        onClick={()=>{
          setEmail("guset@gmail.com")
          setPassword("guest")
        }}
       
      >
       Get Guest User Credentials
      </Button>

  </VStack>
  )
}

export default Login