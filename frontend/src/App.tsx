
import { Routes, Route } from "react-router-dom"
import  Home  from "./pages/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/"  element = {<Home/>} >
          <Route path="register" element={<Signup/>} />
          <Route path="login" element={<Login/>} />
      
        </Route>
      </Routes>
    </>
  )
}

export default App
