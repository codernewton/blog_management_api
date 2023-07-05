//@@ import dependencies
import mongoose from 'mongoose'
import colors from 'colors'
import { dbUri } from '../secret.js'

//@@ database connection
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri,{dbName : 'bms'})
    console.log(`connected with database : ${mongoose.connection.host}`
    .bgYellow.black)
  } catch (error) {
    
  }
}

export default connectDB