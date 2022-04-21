const UserControllers = require("../../controllers/user.controller")
const { userVerified } = require("../../middlewares/user.middleware")
const express = require("express")
const route = express.Router()

route.post("/register", UserControllers.userRegister)
route.post("/login", userVerified, UserControllers.userLogin)

module.exports = route
