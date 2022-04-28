const mongoose = require("mongoose")

const voteSchema = mongoose.Schema({
    like: {
        type: Boolean
    },
    user_id: {
        type: String
    },
    post_id: {
        type: String
    }
})

module.exports = mongoose.model("vote", voteSchema)