const UserControllers = require("../../controllers/user.controller")
const express = require("express")
const route = express.Router()

route.post("/register", UserControllers.userRegister)

module.exports = route
