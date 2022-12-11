const express=require("express")

const router=express.Router()

const postController=require("./../controller/post.js")

router.post("/post",postController.createPost)
router.post("/post/:id",postController.updatePost)
router.post('/post/:id', function(req, res){
    postController.updatePost
 });

module.exports=router