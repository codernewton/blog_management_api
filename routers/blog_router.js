//@@ import dependencies
import {Router} from 'express'
import userAuth from './../middleware/authentication.js'
import { createPost, deletePostById, getAllPost, getPostById, updatePostById 
} from '../controllers/blog_controller.js'

//@@ create router
const blogRouter = Router()

//@@ define routes
blogRouter.use(userAuth)
//@ get/update/delete post by id
blogRouter.route('/post/:id')
.get(getPostById)
.patch(updatePostById)
.delete(deletePostById)

//@ create new blog post/find all post
blogRouter.route('/post')
.post(createPost)
.get(getAllPost)

export default blogRouter
