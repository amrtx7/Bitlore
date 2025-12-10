const express = require('express')
const router = express.Router()
const {requireAuth,checkUser} = require("../middlewares/authMiddleware")
const blogController = require("../controllers/blogController")

router.get('/blogs',requireAuth,blogController.getBlogs)
router.get('/:userid/write',checkUser,blogController.getWriteBlogs)
router.post('/:userid/write',checkUser,blogController.postWriteBlogs)

module.exports = router