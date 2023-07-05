//@@ import dependencies
import catchAsync from 'express-async-handler'
import {createError} from  'http-errors-enhanced'
import User from '../Models/User.js'
import { successResponse } from './response_controller.js'
import { isValidObjectId } from 'mongoose'

//@Disc : get all users || GET : api/v1/users || access : admin[private]
export const getAllUsers = catchAsync(async(req,res,next) => {
  const {role} = req.user
  if(role === 'admin') {
    let users = await User.find({role : {$eq : 'user'}}).select({password : 0,
      createdAt : 0, updatedAt : 0, __v : 0})
      .populate('posts','-_id -author -createdAt -updatedAt -__v')
      successResponse(res,{
        statusCode : 200,
        message : 'all user fetch successfully',
        payload : users
      })
  } else {
    next(createError(401,'Unauthorized user'))
  }
})

//@Disc : get user by id || GET : api/v1/user/id || access : admin[private]
export const getUserById = catchAsync(async(req,res,next) => {
  const isValidId = isValidObjectId(req.params.id)
  if(isValidId) {
    const {role} = req.user
    if(role === 'admin') {
      const user = await User.findById(req.params.id)
      .select({password : 0,createdAt : 0, updatedAt : 0, __v : 0})
      successResponse(res,{
        statusCode : 200,
        message : user === null ? 'user not found': 'user fetch success fully',
        payload : user === null ? {} : user
      })
    } else {
      next(createError(401,'Unauthorized user'))
    }
  } else {
    next(createError(401,'invalid id provided'))
  }
})

//Disc : delete user by id || DELETE : api/v1/user/id || access : admin[private]
export const deleteUserById = catchAsync(async(req,res,next) => {
  const isValidId = isValidObjectId(req.params.id)
  if(isValidId) {
    const {role} = req.user
    if(role === 'admin') {
      const user = await User.findByIdAndRemove(req.params.id)
      successResponse(res,{
        statusCode : 200,
        message : user === null ? 'no user found' : `${req.user.id} - deleted success fully`,
      })
    } else {
      next(createError(401,'Unauthorized user'))
    }
  } else {
    next(createError(401,'invalid id provided'))
  }
})