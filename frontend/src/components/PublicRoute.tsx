import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { LocalStorage } from '@/utils/Localstorage'
import {toast} from 'react-toastify'

type ChildrenProps = {
   children : React.ReactNode
}
 const PublicRoute = ({children}:ChildrenProps) => {
    const User = LocalStorage.get("user")
    const id  = User?._id
    const navigate = useNavigate()
    if(!id && !User){
      useEffect(() => {
         navigate("/signup")
         toast.error("Pls Signup to continue")
      },[navigate])
       return null
    }
    return <>{children}</>
 
}

export default PublicRoute


