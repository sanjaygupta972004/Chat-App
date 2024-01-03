import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
      credentials: true  
}))
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

app.use("/api/v1/users",userRouter)


export {app}