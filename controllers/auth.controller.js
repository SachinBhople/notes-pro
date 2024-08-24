// register admin
// login admin
// logout admin


// login user
// logout user

const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")
const { checkEmpty } = require("../utils/checkEmpty")
const Emplyoee = require("../models/Emplyoee")
// const validator
exports.registeAdmin = asyncHandler(async (req, res) => {

    const hash = await bcrypt.hash(req.body.password, 10)
    await Admin.create({ ...req.body, password: hash })
    res.json({ message: "register success" })
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const { isError, error } = checkEmpty({ username, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields required", error })
    }

    const result = await Admin.findOne({
        $or: [
            { email: username },
            { mobile: username },
        ]
    })

    if (!result) {
        return res.status(401).json({ message: "Email/ Mobile Not found" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "7d" })
    res.cookie("admin", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: process.env.NODE_ENV === "production" })
    res.status(200).json({
        message: "login Success", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            _id: result._id,
        }
    })



})
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "admin logout success" })

})
exports.loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const { isError, error } = checkEmpty({ username, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields required", error })
    }

    const result = await Emplyoee.findOne({
        $or: [
            { email: username },
            { mobile: username },
        ]
    })

    if (!result) {
        return res.status(401).json({ message: "Email/ Mobile Not found" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "7d" })
    res.cookie("employee", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: process.env.NODE_ENV === "production" })
    res.status(200).json({
        message: "login Success", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            _id: result._id,
        }
    })

})
exports.logoutuser = asyncHandler(async (req, res) => {
    res.clearCookie("employee")
    res.json({ message: "employee logout success" })
})