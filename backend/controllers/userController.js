require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login
const login = async (req, res) => {

    const { userNameOrEmail, password } = req.body

    try {
        const user = await User.loginuser(userNameOrEmail, password)

        const userName = user.userName

        //create a token

        const token = createToken(user._id)

        res.status(200).json({ userName, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//register
const register = async (req, res) => {

    const { userName, email, password, confirmPassword } = req.body

    try {
        const user = await User.registeruser(userName, email, password, confirmPassword)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({ userName, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    login,
    register
}