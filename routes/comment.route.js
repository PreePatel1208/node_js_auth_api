const express=require("express")

const router=express.Router()

const {createComment,getSingleComment,getAllComment,updateComment,deleteComment }=require("./../controller/commentController")

router.post("/comment",createComment)

router.put("/comment/:id", updateComment)

router.delete("/comment/:id", deleteComment)

router.get("/comment", getAllComment)

router.get("/comment/:id", getSingleComment)

module.exports=router

