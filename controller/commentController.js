const formidable = require("formidable");
const Comment = require("./../model/commet")

exports.createComment = async (req, res) => {

    const { name, email, post_id, text } = req.body

    if (!(name && email && post_id && text)) {

        res.status(400).json({ message: "please enter require fields" })
    }
    const commentContent = await Comment.create(req.body)

    res.status(200).json({ message: "success", comment: commentContent })
}

exports.deleteComment = async (req, res) => {
    const id = req.params.id

    const result = await Comment.findByIdAndDelete(id);

    if (result) {

        return res.status(200).json({ message: "Comment deleted successfully", data: result })

    } else {

        return res.status(400).json({ message: "Comment is not found" })
    }
}

exports.updateComment = async (req, res) => {

    const id = req.params.id

    const { name, email, post_id, text } = req.body

    if (!(name && email && post_id && text)) {

        res.status(400).json({ message: "please enter require fields" })
    }
    if (!id) {
        res.status(400).json({ message: "please enter comment id" })
    }
    const commentContent = await Comment.findByIdAndUpdate(id, req.body,
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json({ message: "success", comment: commentContent })
}

exports.getAllComment = async (req, res) => {

    const allComment = await Comment.find().select("name text created text")

    if (!allComment) {

        res.status(400).json({ message: "no comment found" })

    }
    res.status(200).json({ message: "success", Comments: allComment })

}

exports.getSingleComment=async(req,res)=>{

    const id=req.params.id

    if(!id){

        res.status(400).json({message:"please input comment id"})
    }

    const comment=await Comment.findById(id)
    
    if(!comment){

        res.status(400).json({message:"No comment found"})
    }

    res.status(200).json({message:"success",comment:comment})

}
