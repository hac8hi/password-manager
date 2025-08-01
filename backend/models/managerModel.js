
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const managerSchema = new Schema({

    webSite: {
        type: String,
        required: true
    },
    identifiant: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Manager', managerSchema)