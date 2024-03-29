import React, { useEffect } from 'react'

import { useAuthContext } from './context/authContext'
import { useNavigate } from 'react-router-dom'
type ChildrenProps = {
   children : React.ReactNode
}

 const PrivateRoute = ({children}:ChildrenProps) => {
 const {token , isLoggedUser} = useAuthContext()!
 const navigate  = useNavigate()

 const isUserVerified = isLoggedUser?.isEmailVerified

 if(!isUserVerified && !token){
  useEffect(() => {
    navigate("/login")
  },[navigate])
  return null
 }
  return (
    <div>
          {children}
      </div>
  )
}


export default PrivateRoute