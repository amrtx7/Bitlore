const express = require("express")
const router = express.Router()
const routeController = require("../controllers/routeController")
const {requireAuth,checkUser} = require("../middlewares/authMiddleware")

router.get('/',checkUser,routeController.getHome)
router.get('/about',routeController.getAbout)
router.get('/contacts',routeController.getContacts)
router.get('/home',routeController.getHome)
router.get('/blogs',requireAuth,routeController.getBlogs)
router.get('/:userid/write',checkUser,routeController.getWriteBlogs)
router.post('/:userid/write',checkUser,routeController.postWriteBlogs)
router.get('/users',requireAuth,routeController.getUsers)


module.exports = router