const admincontroller = require("../controllers/auth.controller")

const router = require("express").Router()



router

    .post("/register-admin", admincontroller.registeAdmin)
    .post("/login-admin", admincontroller.loginAdmin)
    .post("/logout-admin", admincontroller.logoutAdmin)

    .post("/login-user", admincontroller.loginUser)
    .post("/logout-user", admincontroller.logoutuser)


module.exports = router