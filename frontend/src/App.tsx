
import { Routes, Route} from "react-router-dom"
import  Home  from "./pages/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import EmailVerification from "./pages/EmailVerification"
import  ResendEmailVerification from "./pages/ResendEmailVerification"
import NotFound from "./pages/ErrorNotFound"
import PublicRoute from "./components/PublicRoute"
import PrivateRoute from "./components/PrivateRoute"
import Chat from "./pages/Chat"
import { LocalStorage } from "./utils/Localstorage"


function App() {
  const accessToken  = LocalStorage.get("accessToken")
  const isLoggedUser = LocalStorage.get("isLoggedUser")

  return (
    <>
      <Routes>
        {
          accessToken && isLoggedUser?.isEmailVerified === true ? <Route path="/" element={<Chat/>}/> : null
        }

        <Route path="/" element={<Home/>}>
          <Route path="signup" element={<Signup/>} />
          <Route path="login" element={
       
                <Login/>
              }/>
        </Route>
        <Route path ="/emailVerification" element = {
          <PublicRoute>
            <EmailVerification/>
         </PublicRoute>}>
        </Route>
        <Route path ="/resend-emailVerification" element = {
          <PublicRoute>
            <ResendEmailVerification/>
          </PublicRoute>
        }></Route>
  // public route
        <Route path = "/chats"  element  = {
          <PrivateRoute>
            <Chat/>
          </PrivateRoute>
        
        }> 
            
        </Route>
        <Route path = "*" element = {<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
