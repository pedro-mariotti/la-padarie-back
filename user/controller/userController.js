const express = require('express')
const router = express.Router()
const userService = require('../service/userService')

router.get('/user', userService.getAllUsers)
router.post('/user', userService.createUser)
router.put('/user', userService.updateUser)
router.delete('/user', userService.deleteUser)

module.exports = router
