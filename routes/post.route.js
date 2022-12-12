const express = require("express")

const router = express.Router()

const { createPost, updatePost, deletePost, getAllPost, getSinglePost } = require("./../controller/post")

router.post("/post", createPost)

router.put("/post/:id", updatePost)

router.delete("/post/:id", deletePost)

router.get("/post", getAllPost)

router.get("/post/:id", getSinglePost)

module.exports = router