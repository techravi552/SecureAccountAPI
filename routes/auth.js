const express = require("express")
const router = express.Router()
const { register, login } = require("../controllers/authController")
const { resetPassword } = require("../controllers/resetController");

router.post("/register", register)

router.post("/login", login)

router.post("/resetpassword", resetPassword);

module.exports = router
