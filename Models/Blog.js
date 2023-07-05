//@@ import dependencies
import mongoose from 'mongoose'

//@@ create schema
const blogSchema = new mongoose.Schema({
  title : {
    type : String,
    trim : true,
    required : [true, 'title is required'],
    maxLength: [16, 'title not over 16 characters']
  },
  description : {
    type : String,
    trim : true,
    required : [true, 'description is required'],
    maxLength: [200, 'title not over 200 characters']
  },
  author : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
  }
},{timestamps : true})

//@@ export model
const Blog = mongoose.model('Blog',blogSchema)
export default Blog