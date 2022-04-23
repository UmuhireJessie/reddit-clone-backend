const userRoutes = require("./api/user")
const postRoutes = require("./api/post")
const commentRoutes = require("./api/comment")
const express = require("express")
const { validatePostId } = require("../middlewares/post.middleware")

const routes = express.Router()

routes.use("/users", userRoutes)
routes.use("/posts", postRoutes)
routes.use("/posts/:postId/comments", validatePostId, commentRoutes)
module.exports = routes