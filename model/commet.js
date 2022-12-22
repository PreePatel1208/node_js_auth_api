const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema

const postComment = mongoose.Schema({

    post_id: { type: ObjectId, ref: "Post", default: null },
    
    user_id: { type: ObjectId, ref: "User", default: null },

    text: { type: String, default: null },

    likes: { type: Number, default: null },

    created: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("Comment", postComment)