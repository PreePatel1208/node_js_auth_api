const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema

const postSchema = mongoose.Schema({
    title: { type: String, default: null },

    body: { type: String, default: null },

    user_id: { type: ObjectId, ref: "User" },

    images: { data: Buffer, contentType: String },

    images: { data: Buffer, contentType: String },

    created: {type: Date,default: Date.now()},     
})

module.exports=mongoose.Schema("Post",postSchema)
