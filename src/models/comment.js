const mongoose = require("mongoose")

const commentModel = mongoose.Schema({
    name: {
        type: String
    },
    content: {
        type: String
    },
    downVotes: {
        type: Array,
        default: []
    },
    upVotes: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("comment", commentModel)