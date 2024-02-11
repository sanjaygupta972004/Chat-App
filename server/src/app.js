import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import pasport from "passport"
import "./passport.js"


const app = express()

app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true  
}))

app.use(cookieSession({
      name: "session",
      keys: ["Chat-App","key2"],
      maxAge : 24 * 60 * 60 * 1000

}))

app.use(pasport.initialize())
app.use(pasport.session())

app.use(bodyParser.urlencoded({
      limit: "15mb",
   extended: true
}))
app.use(bodyParser.json({
      limit: "15mb",
      extended: true
}))
app.use(cookieParser())
app.use(express.static("public"))

import userRouter from "./routers/user.router.js"
import chatRouter from "./routers/chat.router.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/chats",chatRouter)


export {app}