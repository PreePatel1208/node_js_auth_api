const express = require("express")
const { diskStorage } = require("multer")
var Path = require('path');

const router = express.Router()
const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now()
                + Path.extname(file.originalname))
        }
    })
}).single("image")

const uploadPostImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now()
                + Path.extname(file.originalname))
        }
    })
}).array("image")
const { createPost, updatePost, deletePost, getAllPost, getSinglePost } = require("./../controller/post")

// router.post("/posts", createPost)

router.put("/posts/:id", updatePost)

router.delete("/posts/:id", deletePost)

router.get("/posts", getAllPost)

router.get("/posts/:id", getSinglePost)

router.post('/posts', upload, createPost);

router.post('/posts/upload', uploadPostImage,(req,res)=>{
 
});


module.exports = router