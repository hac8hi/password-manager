require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const managerRoutes = require('./routes/managerRoutes')

const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/manager', managerRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen to req
        app.listen(process.env.PORT, () => {
            console.log('LISTENING ON PORT', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })