import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
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
const history = useHistory()
const[email, setEmail] = useState("")
const[password, setPassword] = useState("")
const[show, setShow] = useState(false)

const handleClick = () => setShow(!show)

const fieldData = { email, password}

//console.log(fieldData)

const submitHandler = async (e) => {
e.preventDefault()

try {
  const res = await axios.post("http://localhost:5000/api/v1/users/login", fieldData)
  console.log(res.data)
  setEmail("")
  setPassword("")
  toast({
    title: "Login Successful",
    status: "success",
    duration: 3000,
    isClosable: true,
  })
  history.push("/chat")
} catch (error) {
  console.error(error.message) 
  toast({
    title: "Login Failed",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top-right"
  })
}

}

  return (
    <VStack spacing={"8px"} >
   
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

  <Button
        colorScheme="blue"
        width="100%"
        className="mt-2"
        onClick={submitHandler}
      
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