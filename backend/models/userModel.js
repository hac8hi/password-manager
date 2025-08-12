const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({

    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.loginuser = async function (userNameOrEmail, password) {

    //validation
    if (!userNameOrEmail || !password) {
        throw Error('All field must be filled')
    }

    //verify existabce in db
    const user = await this.findOne({ userName: userNameOrEmail }) || await this.findOne({ email: userNameOrEmail })

    if (!user) {
        throw Error('There is no such userName or email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

userSchema.statics.registeruser = async function (userName, email, password, confirmPassword) {

    //validation
    if (!userName || !email || !password || !confirmPassword) {
        throw Error('All field must be filled')
    }

    const userNameExists = await this.findOne({ userName })
    if (userNameExists) {
        throw Error('This username is already used by an account')
    }

    //verify existance in db
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('This email is already used by an account')
    }

    if (password !== confirmPassword) {
        throw Error('Re-confirm the password because it does not match')
    }

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ userName, email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)