const mongoose = require("mongoose")

const employeeSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "team"
    },
    Isactive: {
        type: Boolean,
        default: true,
        required: true
    },
    avatar: {
        type: String,
        default: true,

    },

}, { timestamps: true })


module.exports = mongoose.model("employee", employeeSchma)