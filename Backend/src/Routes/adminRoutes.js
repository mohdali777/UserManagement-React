const express = require('express')
const router = express.Router()
const AdminRoutes = require('../controllers/adminControllers')

router.get("/getUser",AdminRoutes.getUserData)

module.exports = router