const user = require("../models/user")

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

module.exports = { userVerified }