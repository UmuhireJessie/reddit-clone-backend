const CommentController = require("../../controllers/comment.controller")
const express = require("express")
const { userLoggedIn } = require("../../middlewares/user.middleware")
const { validateCommentId } = require("../../middlewares/comment.middleware")
const route = express.Router()

route.post("/", userLoggedIn, CommentController.createComment)
route.get("/", userLoggedIn, CommentController.findComments)
route.get("/:commentId", userLoggedIn, validateCommentId, CommentController.findOneComment)

module.exports = route