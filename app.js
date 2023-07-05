//@@ import dependencies
import express from 'express'
import helmet from 'helmet'
import {createError} from 'http-errors-enhanced'
import limitRequest from 'express-rate-limit'
import morgan from 'morgan'
//@@ connect with database
import connectDB from './config/dbConfig.js'
connectDB()
//@@ import routers
import authRouter from './routers/auth_router.js'
import userRouter from './routers/user_routers.js'
import blogRouter from './routers/blog_router.js'
//@@ import files
import globalErrorHandler from './middleware/global_error_handler.js'

//@@ create express app
const app = express()

//@@ define middleware
app.use(express.json({limit : '100kb'}))
app.use(express.urlencoded({limit : '100kb',extended : true}))
app.use(helmet())
app.use(limitRequest({
  windowMs : 5 * 60 * 100,
  limit : 100,
  legacyHeaders : false,
  standardHeaders : false
}))
app.use(morgan('dev'))

//@@ define routes
app.use('/api/v1/user',authRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',blogRouter)

//@@ unhandled routes
app.all('*',(req,res,next) => {
  next(createError(404,`${req.originalUrl} - not found`))
})

//@@ global error handler
app.use(globalErrorHandler)

//export app
export default app