const express = require('express')
const router = express.Router()
const {
    getAll,
    addLogin,
    deleteLogin,
    updateLogin,
    getLogin
} = require('../controllers/managerController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.post('/', addLogin)

router.get('/', getAll)

router.get('/:id', getLogin)

router.delete('/:id', deleteLogin)

router.patch('/:id', updateLogin)

module.exports = router