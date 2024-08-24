const mongoose = require("mongoose")

const teamSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Isactive: {
        type: Boolean,
        default: true,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.model("team", teamSchma)