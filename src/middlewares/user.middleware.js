const user = require("../models/user")
const { decodeToken } = require("../helpers/user.helper")
const UserService = require("../services/user.service")

const userVerified = async (req, res, next) => {
    const { email } = req.body
    const userVerify = await user.findOne({ email })
    if (userVerify) {
        return next()
    }
    return res.status(400).json({
        message: "user doesn't exist"
    })
}

const userLoggedIn = async (req, res, next) => {
    const header = req.headers.authorization
    if (!header) {
        return res.status(403).json({
            message: "User not logged in"
        })
    }
    const token = header.split(" ")[1]
    const userInfo = decodeToken(token)
    const user = await UserService.userExist(userInfo)
    req.user = user
    return next()
}

module.exports = { userVerified, userLoggedIn }