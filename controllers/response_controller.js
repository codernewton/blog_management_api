

//@@ error response
const errorResponse = (res,{statusCode = 500, message = 'server side error' }) => {
  res.status(statusCode).json({
    success : false,
    message
  })
}

//@@ success response
const successResponse = (res,{statusCode = 200, message = 'success', payload = {} }) => {
  res.status(statusCode).json({
    success : true,
    message,
    payload
  })
}

export {errorResponse,successResponse}