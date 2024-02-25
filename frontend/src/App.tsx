
import { Routes, Route } from "react-router-dom"
import  Home  from "./pages/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import EmailVerification from "./pages/EmailVerification"
import  ResendEmailVarification from "./pages/ResendEmailVarification"
import NotFound from "./pages/ErrorNotFound"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/"  element = {<Home/>} >
          <Route path="signup" element={<Signup/>} />
          <Route path="login" element={<Login/>} />

        </Route>
        <Route path ="/emailVarification" element = {<EmailVerification/>}></Route>
        <Route path ="/resend-emailVarification" element = {<ResendEmailVarification/>}></Route>
        <Route path = "*" element = {<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
