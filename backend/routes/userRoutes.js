const express = require('express')
const router = express.Router()
const {
    login,
    register
} = require('../controllers/userController')

//login
router.post('/login', login)

//register
router.post('/register', register)

module.exports = router