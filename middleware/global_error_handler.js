//@@ import dependencies
import { errorResponse } from "../controllers/response_controller.js"
import { errorFormatter } from './../utils/errorFormatter.js'

const globalErrorHandler = (err,req,res,next) => {
  if(err.name === 'ValidationError') {
    errorResponse(res,{
      statusCode : 400,
      message : errorFormatter(err.message)
    })
  } else if (err.name === 'JsonWebTokenError') {
    errorResponse(res,{
      statusCode : 400,
      message : 'invalid access token'
    })
  } else if (err.name === 'TokenExpiredError') {
    errorResponse(res,{
      statusCode : 400,
      message : err.message
    })
  } else if (err.code && err.code === 11000) {
    errorResponse(res,{
      statusCode : 400,
      message : `${Object.keys(err.keyValue)} has to be unique`
    })
  } else {
    errorResponse(res,{
      statusCode : err.statusCode,
      message : err.message
    })
  }
}

export default globalErrorHandler