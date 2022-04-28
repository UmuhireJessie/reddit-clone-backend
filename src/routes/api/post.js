const PostController = require("../../controllers/post.controller")
const { userLoggedIn } = require("../../middlewares/user.middleware")
const upload = require("../../helpers/multer")
const imageUpload = require("../../middlewares/image.middleware")
const { validatePostId } = require("../../middlewares/post.middleware")
const express = require("express")
const route = express.Router()

route.post("/", userLoggedIn, upload.array("image"), imageUpload, PostController.createPost)
route.patch("/:postId", userLoggedIn, validatePostId, upload.array("image"), imageUpload, PostController.updatePost)
route.get("/", userLoggedIn, PostController.findAllPosts)
route.get("/:postId", userLoggedIn, validatePostId, PostController.findOne)
route.delete("/:postId", userLoggedIn, validatePostId, PostController.deletePost)

// upvotes
route.post("/:postId/upvote", userLoggedIn, validatePostId, PostController.postUpvote)

// downvotes
route.post("/:postId/downvote", userLoggedIn, validatePostId, PostController.postDownvote)

// subreddits
route.get("/:category", userLoggedIn, PostController.subRedditCategory)

module.exports = route