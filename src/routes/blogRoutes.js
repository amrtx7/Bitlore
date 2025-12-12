const express = require('express')
const router = express.Router()
const {requireAuth,checkUser} = require("../middlewares/authMiddleware")
const {protectedRoute} = require("../middlewares/blogMiddleware")
const blogController = require("../controllers/blogController")

router.get('/blogs',requireAuth,blogController.getBlogs)
router.get('/:userid/write',checkUser,blogController.getWriteBlogs)
router.post('/:userid/write',checkUser,protectedRoute,blogController.postWriteBlogs)
router.use('/:slug',protectedRoute)

module.exports = router