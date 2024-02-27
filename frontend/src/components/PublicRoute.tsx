import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { LocalStorage } from '@/utils/Localstorage'

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
      },[navigate])
       return null
    }

    return <>{children}</>
 
}

export default PublicRoute


