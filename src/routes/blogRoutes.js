const express = require('express')
const router = express.Router()
const {requireAuth,checkUser} = require("../middlewares/authMiddleware")
const {protectedRoute} = require("../middlewares/blogMiddleware")
const blogController = require("../controllers/blogController")

router.get('/myblogs',checkUser,requireAuth,blogController.getUserBlogs)
router.get('/:userid/write',checkUser,requireAuth,protectedRoute,blogController.getWriteBlogs)
router.post('/:userid/write',checkUser,requireAuth,protectedRoute,blogController.postWriteBlogs)
// router.use('/:slug',protectedRoute)

module.exports = router
