const user = require("../models/user")

class UserService {
    static async createUser(data) {
        const newUser = await new user(data)
        await newUser.save()
        return newUser
    }
}

module.exports = UserService