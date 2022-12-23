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
            cb(null, 'uploads/images')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now()
                + Path.extname(file.originalname))
        }
    })
}).single("image")
const { createPost, updatePost, deletePost, getAllPost, getSinglePost } = require("./../controller/post");
const protect = require("../service/protect");

router.use(protect)

router.put("/posts/:id", upload,updatePost)

router.delete("/posts/:id", deletePost)


router.get("/posts", getAllPost)

router.get("/posts/:id", getSinglePost)

router.post('/posts', upload, createPost);

router.post('/posts/upload', uploadPostImage, (req, res) => {

    res.status(200).json({ message: "success" ,file:req.file})
    
});


module.exports = router