//@@ import dependencies
import {Router} from 'express'
import { loginUser, registerUser } from '../controllers/auth_controller.js'

//@@ create router
const authRouter = Router()

//@@ define routes
//@ register new user
authRouter.post('/register',registerUser)
//@ login new user
authRouter.post('/login',loginUser)

export default authRouter