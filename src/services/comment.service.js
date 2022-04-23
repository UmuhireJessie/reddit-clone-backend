const comment = require("../models/comment")

class CommentService {
    static async createComment(data) {
        const commentCreate = await comment.create(data)
        return await commentCreate.save()
    }

    static async findComment(id) {
        return await comment.findById(id)
    }

    static async deletecomment(id) {
        return await comment.deleteOne({ _id: id })
    }
}

module.exports = CommentService