const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema

const postSchema = mongoose.Schema({
    title: { type: String, default: null },

    slug: { type: String, default: null },

    body: { type: String, default: null },

    user_id: { type: ObjectId, ref: "User",default:null },

    images: { type: String ,default:null},

    created: {type: Date,default: Date.now()},     
})

module.exports=mongoose.model("Post",postSchema)
