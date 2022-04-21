const user = require("../models/user")

class UserService {
    static async createUser(data) {
        const newUser = await new user(data)
        await newUser.save()
        return newUser
    }

    static async userExist(data) {
        return await user.findOne(data)
    }
}

module.exports = UserService