const express = require('express')
const router = express.Router()
const UserRoutes = require('../controllers/userControllers')

router.post('/addUser/Login',UserRoutes.SignIn)
router.post('/addUser/Signup',UserRoutes.Signup)

module.exports = router