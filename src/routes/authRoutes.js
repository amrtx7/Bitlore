const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.get('/auth/signup',authController.signup_get)
router.get('/auth/login',authController.login_get)
router.post('/auth/signup',authController.signup_post)
router.post('/auth/login',authController.login_post)
router.get('/auth/logout',authController.logout_get)
router.get('/users',authController.users_get)

module.exports = router