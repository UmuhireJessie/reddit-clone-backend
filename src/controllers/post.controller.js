const PostService = require("../services/post.service")
const VoteService = require("../services/votes.service")
class PostController {
    static async createPost(req, res) {
        try {
            const { user } = req
            const { title, content, image, category } = req.body
            const post = await PostService.createPost({
                title,
                content,
                image,
                category
            })
            const updatedPost = await VoteService.createUpVote(user._id.toString(), post._id.toString())
            return res.status(200).json({
                message: "Post created successfully",
                data: updatedPost
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }

    }

    static async updatePost(req, res) {
        try {
            const { post } = req
            const { title, content, image, video, comments, category, upVotes, downVotes } = req.body

            if (title) post.title = title
            if (content) post.content = content
            if (image) post.image = image
            if (video) post.video = video
            if (comments) post.comments = comments
            if (category) post.category = category
            if (upVotes) post.upVotes = upVotes
            if (downVotes) post.downVotes = downVotes

            await post.save()

            return res.status(200).json({
                message: "Post updated successfully",
                data: post
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async findAllPosts(req, res) {
        try {
            const allPosts = await PostService.findAll()
            return res.status(200).json({
                message: "All posts",
                data: allPosts
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }

    }

    static async findOne(req, res) {
        try {
            const { post } = req
            const findOne = await PostService.findbyId(post._id)
            res.status(200).json({
                message: "One post",
                data: findOne
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async deletePost(req, res) {
        try {
            const { post } = req
            const deletePost = await PostService.delete(post._id)
            return res.status(200).json({
                message: "Post deleted successfully"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async postUpvote(req, res) {
        try {
            const { post } = req
            const { user } = req
            const upVote = await VoteService.createUpVote(user._id.toString(), post._id)

            return res.status(200).json({
                data: upVote
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async postDownvote(req, res) {
        try {
            const { post } = req
            const { user } = req
            const upVote = await VoteService.createDownVote(user._id.toString(), post._id)

            return res.status(200).json({
                data: upVote
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async subRedditCategory(req, res) {
        try {
            const { category } = req.query
            const subreddits = await PostService.findCategory(category)
            res.status(200).json({
                message: "subreddits",
                data: subreddits
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }
    }
}

module.exports = PostController