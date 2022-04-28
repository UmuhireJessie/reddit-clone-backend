const vote = require("../models/votes")
const post = require("../models/post")

class VoteService {
    static async createUpVote(user_id, id) {
        const upVote = await vote.findOne({ user_id: user_id, post_id: id.toString() })
        const votePost = await post.findById(id)
        if (!upVote) {
            const upVoteCreate = await vote.create({
                user_id: user_id,
                post_id: id.toString(),
                like: true
            })
            votePost.votes.push(upVoteCreate)
            votePost.likes++
            console.log(votePost)
        }
        else if (upVote.like === true) {
            upVote.like = null
            // const updateUpvote = votePost.votes.filter(votes => votes.user_id === user_id)
            // updateUpvote[0].like = null
            for (let vote in votePost.votes) {
                if (votePost.votes[vote].user_id === user_id) {
                    votePost.votes[vote].like = null
                }
            }

            if (votePost.likes !== 0) {
                votePost.likes--
            }
            await upVote.save()
        }
        else if (upVote.like === null) {
            upVote.like = true
            for (let vote in votePost.votes) {
                if (votePost.votes[vote].user_id === user_id) {
                    votePost.votes[vote].like = true
                }
            }
            votePost.likes++
            await upVote.save()
        }
        else if (upVote.like === false) {
            upVote.like = true
            for (let vote in votePost.votes) {
                if (votePost.votes[vote].user_id === user_id) {
                    votePost.votes[vote].like = true
                }
            }
            if (votePost.likes === 0) {
                votePost.likes += 1
            }
            else if (votePost.likes !== 0) {
                votePost.likes += 2
            }
            await upVote.save()
        }
        await votePost.save()
        return votePost
    }

    static async createDownVote(user_id, id) {
        const downVote = await vote.findOne({ user_id: user_id, post_id: id.toString() })
        const votePost = await post.findById(id)
        if (!downVote) {
            const upVoteCreate = await vote.create({
                user_id: user_id,
                post_id: id.toString(),
                like: false
            })
            votePost.votes.push(upVoteCreate)
            votePost.likes--
            await upVoteCreate.save()
        }
        else if (downVote.like === false) {
            downVote.like = null
            for (let vote in votePost.votes) {
                if (votePost.votes[vote].user_id === user_id) {
                    votePost.votes[vote].like = null
                }
            }

            if (votePost.likes !== 0) {
                votePost.likes--
            }
            await downVote.save()
        }
        else if (downVote.like === null) {
            downVote.like = false
            for (let vote in votePost.votes) {
                if (votePost.votes[vote].user_id === user_id) {
                    votePost.votes[vote].like = false
                }
            }
            votePost.likes--
            if (votePost.likes < 0) votePost.likes = 0
            await downVote.save()
        }
        else if (downVote.like === true) {
            downVote.like = false
            for (let vote in votePost.votes) {
                if (votePost.votes[vote].user_id === user_id) {
                    votePost.votes[vote].like = false
                }
            }
            if (votePost.likes > 1) {
                votePost.likes -= 2

            }
            else if (votePost.likes <= 1) {
                votePost.likes -= 1
                if (votePost.likes < 0) votePost.likes = 0

            }
            await downVote.save()
        }
        await votePost.save()
        return votePost
    }

}

module.exports = VoteService