//@@ import dependencies
import {Router} from 'express'
import { deleteUserById, 
getAllUsers, getUserById } from '../controllers/user_controller.js'
import userAuth from './../middleware/authentication.js'

//@@ create router
const userRouter = Router()

//@@ define routes
//@get user by id
userRouter.get('/user/:id',userAuth,getUserById)

//@delete user by id
userRouter.delete('/user/:id',userAuth,deleteUserById)

//@get all users
userRouter.get('/users',userAuth,getAllUsers)


export default userRouter
