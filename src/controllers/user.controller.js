const UserService = require("../services/user.service")

class UserControllers {
    static async userRegister(req, res) {
        try {
            const user = await UserService.createUser(req.body)
            return res.status(201).json({
                message: "user registered successful",
                data: user
            })

        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error: error.message
            })
        }


    }
}

module.exports = UserControllers