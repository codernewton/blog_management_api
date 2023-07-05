//@@ import dependencies
import {config} from 'dotenv'; config()

//@@ create env variables
export const serverPort = process.env.PORT || 5000
export const dbUri = process.env.DB_URI
export const secretKey = process.env.JWT_SECRET