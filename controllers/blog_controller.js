//@@ import dependencies
import catchAsync from 'express-async-handler'
import { createError } from 'http-errors-enhanced'
import Blog from '../Models/Blog.js'
import User from '../Models/User.js'
import { successResponse } from './response_controller.js'
import { isValidId } from '../utils/id_validity.js'

//@Disc : create new post || POST : /api/v1/post || access : private
export const createPost = catchAsync(async (req, res, next) => {
  const post = await Blog.create({
    ...req.body,
    author: req.user.id,
  })
  await User.updateOne({_id : req.user.id},{$push : {posts : post._id}})
  successResponse(res, {
    statusCode: 201,
    message: 'post created successfully',
    payload: post,
  })
})

//@@Disc : get all post || GET : /api/v1/post || access : private
export const getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Blog.find({ author: req.user.id })
    .select({
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    })
    .populate('author', 'name email role -_id');
  if (posts) {
    successResponse(res, {
      statusCode: 200,
      message: 'all post fetch successfully',
      payload: posts,
    });
  }
})

//@@Disc : get post by id || GET : /api/v1/post/id || access : private
export const getPostById = catchAsync(async (req, res, next) => {
  if (isValidId(req.params.id)) {
    const post = await Blog.findOne({ _id: req.params.id, author: req.user.id })
      .select({
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate('author', 'name email role -_id');
    successResponse(res, {
      statusCode: 200,
      message: post === null ? 'post not found' : 'post fetch success fully',
      payload: post === null ? {} : post,
    });
  } else {
    next(createError(401, 'invalid id provided'));
  }
})

//@@Disc : update post by id || PATCH : /api/v1/post/id || access : private
export const updatePostById = catchAsync(async (req, res, next) => {
  if (isValidId(req.params.id)) {
    const post = await Blog.findOne({
      _id: req.params.id,
      author: req.user.id,
    });
    if (post) {
      const { title, description } = req.body
      if (title || description) {
        const updatedPost = await Blog.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        successResponse(res, {
          statusCode: 200,
          message: 'post update successfully',
          payload: updatedPost,
        });
      } else {
        next(createError(401, 'provide necessary info for updating'));
      }
    } else {
      next(createError(401, 'no post found'))
    }
  } else {
    next(createError(401, 'invalid id provided'))
  }
})

//@@Disc : delete post by id ||DELETE : api/v1/post/id || access : private
export const deletePostById = catchAsync(async (req, res, next) => {
  if (isValidId(req.params.id)) {
    const post = await Blog.findOne({ _id: req.params.id, author: req.user.id })
    if (post) {
      const deletedItem = await Blog.findByIdAndRemove(req.params.id)
      successResponse(res, {
        statusCode: 200,
        message: `${deletedItem._id} was deleted successfully`
      })
    } else {
      next(createError(401,'no post found'))
    }
  } else {
    next(createError(401, 'invalid id provided'))
  }
})
