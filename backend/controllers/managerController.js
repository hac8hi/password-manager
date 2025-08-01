require('dotenv').config()
const Manager = require('../models/managerModel')
const mongoose = require('mongoose')
const crypto = require("crypto")



const secretKey = Buffer.from(process.env.SECRETKEY, 'base64');
const iv = Buffer.from(process.env.IV, 'base64');

async function encryption(text) {

    const cipher = crypto.createCipheriv(process.env.ALGORITHM, secretKey, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted
}

async function decryption(encrypted) {

    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        secretKey,
        Buffer.from(iv, 'hex')
    );

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

const getAll = async (req, res) => {

    try {

        const webSites = await Manager.find({}).select('webSite').sort({ createdAt: -1 });

        res.status(200).json({ webSites })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getLogin = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "There is no such login" })
    }

    const data = await Manager.findById({ _id: id });

    if (!data) {
        return res.status(404).json({ error: 'This login does not exist' })
    }

    const identifiant = await decryption(data.identifiant)
    const password = await decryption(data.password)

    res.status(200).json({ webSite: data.webSite, identifiant: identifiant, password: password })
}

const addLogin = async (req, res) => {

    const { webSite, identifiant, password } = req.body

    if (!webSite || !identifiant || !password) {
        return Error('All field must be filled')
    }

    const encryptIdentifiant = await encryption(identifiant)
    const encryptPassword = await encryption(password)

    const login = await Manager.create({ webSite, identifiant: encryptIdentifiant, password: encryptPassword })

    res.status(200).json({ login })
}

const deleteLogin = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "There is no such login" })
    }

    const login = await Manager.findOneAndDelete({ _id: id })

    if (!login) {
        res.status(404).json({ error: 'This login does not exist' })
    }

    res.status(200).json({ message: 'Login deleted successfully' })
}

const updateLogin = async (req, res) => {

    const { id } = req.params

    const { webSite, identifiant, password } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "There is no such login" })
    }

    const encryptIdentifiant = await encryption(identifiant)
    const encryptPassword = await encryption(password)

    const newLogin = await Manager.findOneAndUpdate({ _id: id }, { webSite, identifiant: encryptIdentifiant, password: encryptPassword.content })

    if (!newLogin) {
        res.status(404).json({ error: "There is no such login" })
    }

    res.status(200).json({ newLogin })

}

module.exports = {
    getAll,
    getLogin,
    addLogin,
    deleteLogin,
    updateLogin
}