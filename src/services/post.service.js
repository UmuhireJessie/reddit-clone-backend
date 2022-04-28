const post = require("../models/post")

class PostService {
    static async createPost(data) {
        const postCreate = await post.create(data)
        return await postCreate.save()
    }

    static async findbyId(id) {
        return await post.findById(id)
    }

    static async findAll() {
        return await post.find()
    }

    static async delete(id) {
        return await post.deleteOne({ _id: id })
    }

    static async findCategory(data) {
        return await post.find({ data })
    }
}

module.exports = PostService