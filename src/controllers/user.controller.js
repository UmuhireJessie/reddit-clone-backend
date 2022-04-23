const UserService = require("../services/user.service")
const { hashPassword, comparePassword, generateToken, decodeToken } = require("../helpers/user.helper")

class UserControllers {
    static async userRegister(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body
            const userExist = await UserService.userExist({ email })
            if (userExist) {
                return res.status(400).json({
                    message: "User arleady exists"
                })
            }
            const user = await UserService.createUser({
                first_name,
                last_name,
                email,
                password: hashPassword(password)
            })
            const token = generateToken({ _id: user._id }, "1d")
            return res.status(201).json({
                message: "user registered successful",
                token,
                data: user
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }


    }

    static async userLogin(req, res) {
        try {
            const { email, password } = req.body
            const user = await UserService.userExist({ email })
            const validPassword = comparePassword(password, user.password)
            if (validPassword) {
                const token = generateToken({ _id: user._id }, "1d")
                return res.status(200)
                    .header("authenticate", token)
                    .json({
                        message: "user successful logged in",
                        token
                    })
            }
            return res.status(400).json({ message: 'Invalid password' });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }
}

module.exports = UserControllers