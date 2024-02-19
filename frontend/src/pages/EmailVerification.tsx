import { useEffect, useState } from 'react'
import {useParams,Link} from "react-router-dom"
import axios from "axios"

const EmailVerification = () => {
   const[url,setUrl] = useState<Boolean >(false)

   const {varificationToken} = useParams()

   const verifyEmail = async()=> {
      try {
        const verifyUrl  = `/api/v1/users/verify-email/${varificationToken}`
        const response =  await axios.get(verifyUrl)
        console.log(response)
        setUrl(true)
      } catch (error) {
        console.log(error)
        setUrl(false)
      }
   }
   useEffect(()=>{
    verifyEmail()
   },[varificationToken])

  return (
    <>
     
    {
      url ? (
        <div>
          <h1>Email Verified</h1>
          <Link to="/login">Login</Link>
        </div>
      ):(<h1>Verifying Email</h1>)
    }


    </>
  )
}

export default EmailVerification