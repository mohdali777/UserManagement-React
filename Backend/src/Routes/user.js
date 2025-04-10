const express = require('express')
const router = express.Router()
const UserRoutes = require('../controllers/userControllers')

router.post('/addUser/Login',UserRoutes.SignIn)
router.post('/addUser/Signup',UserRoutes.Signup)
router.get('/profile/GetuserData',UserRoutes.getData)
router.post('/profile/Edit-data',UserRoutes.editprofile)
router.get('/user/verifyUser',UserRoutes.verifyUser)

module.exports = router