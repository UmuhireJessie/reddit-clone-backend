const PostService = require("../services/post.service")

const validatePostId = async (req, res, next) => {
    const { postId } = req.params
    const findPost = await PostService.findbyId(postId)
    if (!findPost) return res.status(404).json({ message: "Post not found" })

    req.post = findPost
    next()

}

module.exports = { validatePostId }