//@@ import dependencies
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from '../secret.js'

//@@ create a schema
const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true,'name is required'],
    trim : true
  },
  email : {
    type : String,
    required : [true, 'email is required'],
    lowercase : true,
    trim : true,
    validate : [validator.isEmail,'invalid email']
  },
  password : {
    type : String,
    required : [true, 'password is required'],
    trim : true,
    minlength : [8,'must be 8 characters']
  },
  role : {
    type : String,
    enum : ['user','admin'],
    trim : true,
    required : [true,'please define a role']
  },
  posts : [{
    type : mongoose.Types.ObjectId,
    ref : 'Blog'
  }]
},{timestamps : true})

//hash password
userSchema.pre('save',async function() {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password,salt)
  this.password = hash
})

//@@ compare password
userSchema.method('matchPassword',async function (userPass) {
  return await bcrypt.compare(userPass,this.password)
})

//@@ generate token
userSchema.method('generateToken', function() {
  return jwt.sign({id : this._id, email : this.email, role : this.role},
  secretKey,{expiresIn : '5d'})
})

//export model
const User = mongoose.model('User',userSchema)
export default User