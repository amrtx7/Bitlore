const express = require('express')
const router = express.Router()
const {requireAuth,checkUser} = require("../middlewares/authMiddleware")
const {protectedRoute,requireBlogOwner} = require("../middlewares/blogMiddleware")
const blogController = require("../controllers/blogController")

// router.get('/myblogs',checkUser,requireAuth,blogController.getUserBlogs)
router.get('/:userid/write',checkUser,requireAuth,protectedRoute,blogController.getWriteBlogs)
router.post('/:userid/write',checkUser,requireAuth,protectedRoute,blogController.postWriteBlogs)
router.get('/blogs/:blogName',checkUser,requireAuth,blogController.getBlog)
router.delete('/blog/:blogid',requireAuth,checkUser,requireBlogOwner,blogController.deleteBlog)
router.get('/blog/:blogid/edit',requireAuth,checkUser,requireBlogOwner,blogController.getEditBlog)
router.put('/blog/:blogid/edit',requireAuth,checkUser,requireBlogOwner,blogController.putEditBlog)
// router.use('/:slug',protectedRoute)

module.exports = router



//implement put request in blogcontroller



