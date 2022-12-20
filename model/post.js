const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema

const postSchema = mongoose.Schema({
    title: { type: String, require: "Title is required" },

    slug: { type: String, require: "slug is required" },

    body: { type: String, require: "body is required" },

    user_id: { type: ObjectId, ref: "User", default: null },

    viwes: { type: Number, default: null },

    image:  {
       type:Object,default:null
    },

    created: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("Post", postSchema)
