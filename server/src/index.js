import {app} from "./app.js"
import dotenv from "dotenv"
import mongodbConnection from "./db/index.js"

dotenv.config({
   path:"./.env"
})

mongodbConnection()
.then(()=> {
   const port = process.env.PORT || 6500
   app.listen(port,()=>{
      console.log(`server is running on port ${port}`)
   })
} )

.catch((error)=>{
   console.error(`error during connection server to db ${error}`)
   process.exit(1)
})



