//import dependencies
import jwt from 'jsonwebtoken'
import { createError } from 'http-errors-enhanced'
import catchAsync from 'express-async-handler'
import User from '../Models/User.js'
import { secretKey } from '../secret.js'

//validate token
const userAuth = catchAsync(async(req,res,next) => {
  const authHeader = req.headers['Authorization','authorization']
  if(authHeader) {
    const token = authHeader.split(' ')[1]
      if(token) {
        const decodedPayloads = jwt.verify(token,secretKey)
        req.user = decodedPayloads
        const user = await User.findById(decodedPayloads.id)
          if(user) {
            next()
          } else {
            next(createError(401,'Unauthorized user'))
          }
      } else {
        next(createError(401,'Unauthorized user'))
      }
  } else {
    next(createError(401,'Unauthorized user'))
  }
})

export default userAuth
