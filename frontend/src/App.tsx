
import { Routes, Route } from "react-router-dom"
import  Home  from "./pages/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import EmailVerification from "./pages/EmailVerification"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/"  element = {<Home/>} >
          <Route path="signup" element={<Signup/>} />
          <Route path="login" element={<Login/>} />

        </Route>
        <Route path ="/api/v1/auth/verify-email/:varificationToken" element = {<EmailVerification/>}>

        </Route>

      </Routes>
    </>
  )
}

export default App
