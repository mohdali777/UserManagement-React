const express = require('express')
const router = express.Router()
const AdminRoutes = require('../controllers/adminControllers')

router.get("/getUser",AdminRoutes.getUserData)
router.post('/users/Add-users',AdminRoutes.Addusers)
router.post('/users/Edit-users',AdminRoutes.EditUsers)
router.post('/users/deleteUser/:id',AdminRoutes.DeleteUser)
router.get('/users/serach',AdminRoutes.serachQuery)

module.exports = router