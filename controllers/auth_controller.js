//@@ import dependencies
import catchAsync from 'express-async-handler'
import { createError } from 'http-errors-enhanced'
import User from '../Models/User.js'
import { successResponse } from './response_controller.js'

//@Disc : register new user || POST : /api/v1/user/register || access : public
export const registerUser = catchAsync(async(req,res,next) => {
  const {email,role} = req.body
  const isExist = await User.findOne({email,role})
  if(!isExist) {
    const user = await User.create(req.body)
    successResponse(res,{
      statusCode : 201,
      message : 'user registration success',
      payload : {
        name : user.name,
        email : user.email,
        role : user.role
      }
    })
  } else {
    next(createError(400,'user already exist with this email'))
  } 
})

//@Disc : login user || POST : /api/v1/user/login|| access : public
export const loginUser = catchAsync(async(req,res,next) => {
  const {email,role,password} = req.body
  if(!email || !password) next(createError(400,'Invalid credentials'))
  const user = await User.findOne({email,role})
  if(user && await user.matchPassword(password)) {
    const token = user.generateToken()
    successResponse(res,{
      statusCode : 200,
      message : user.role === 'user' ? 'user login success' : 'admin login success',
      payload : {
        accessToken : token
      }
    })
  } else {
    next(createError(400,'Invalid credentials'))
  }
})

