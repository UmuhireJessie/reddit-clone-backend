const CommentController = require("../../controllers/comment.controller")
const express = require("express")
const { userLoggedIn } = require("../../middlewares/user.middleware")
const { validateCommentId } = require("../../middlewares/comment.middleware")
const route = express.Router()

route.post("/", userLoggedIn, CommentController.createComment)
route.patch("/:commentId", userLoggedIn, validateCommentId, CommentController.updateComment)
route.get("/", userLoggedIn, CommentController.findComments)
route.get("/:commentId", userLoggedIn, validateCommentId, CommentController.findOneComment)
route.delete("/:commentId", userLoggedIn, validateCommentId, CommentController.deleteOneComment)

module.exports = route