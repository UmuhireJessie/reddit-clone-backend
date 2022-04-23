const CommentService = require("../services/comment.service")
class CommentController {
    static async createComment(req, res) {
        try {
            const { post } = req
            const comment = await CommentService.createComment(req.body)
            post.comments.push(comment)
            await post.save()
            return res.status(200).json({
                message: "comment created",
                data: comment
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async updateComment(req, res) {
        try {
            const { comment } = req
            const { name, content, downVotes, upVotes } = req.body

            if (name) comment.name = name
            if (content) comment.content = content
            if (downVotes) comment.downVotes = downVotes
            if (upVotes) comment.upVotes = upVotes

            await comment.save()

            await comment.save()

            res.status(200).json({
                message: "comment updated",
                data: comment
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async findComments(req, res) {
        try {
            const { post } = req
            const comments = post.comments
            res.status(200).json({
                message: "all comments",
                data: comments
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async findOneComment(req, res) {
        try {
            const { comment } = req
            res.status(200).json({
                data: comment
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async deleteOneComment(req, res) {
        try {
            const { comment } = req
            const { post } = req
            const id = comment._id
            await CommentService.deletecomment(comment._id)
            const remainingComments = await post.comments.filter(comment => comment._id.toString() !== id.toString())
            post.comments = remainingComments
            await post.save()
            return res.status(200).json({
                message: "Comment deleted"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }
}

module.exports = CommentController