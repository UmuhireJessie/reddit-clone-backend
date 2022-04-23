const CommentService = require("../services/comment.service")

const validateCommentId = async (req, res, next) => {
    const { commentId } = req.params
    const comment = await CommentService.findComment(commentId)
    if (!comment) return res.status(404).json({ message: "Comment not found" })
    req.comment = comment
    next()
}

module.exports = { validateCommentId }