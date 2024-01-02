import mongoose from 'mongoose';
import {DB_NAME} from '../constant.js';

const mongodbConnection = async () => {
   try {
      const connectionInfo = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
      console.log(connectionInfo.connection.host)
      
   } catch (error) {
      console.log("Error during connected to mongodb",error.message)
      throw error;
   }
}

export default mongodbConnection