const mongoose = require("mongoose")

const postModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        default: []
    },
    video: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    category: {
        type: String
    },
    votes: {
        type: Array,
        default: []
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("post", postModel)