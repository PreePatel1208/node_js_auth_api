const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema

const postComment = mongoose.Schema({

    name: { type: String, require: "name is required" },

    email: { type:String,require: "email is required" },

    post_id: { type: ObjectId, ref: "Post", default: null },

    text: { type: String, default: null },

    likes: { type: Number, default: null },

    created: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("Comment", postComment)