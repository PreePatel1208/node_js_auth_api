const formidable = require("formidable");

const Post = require("./../model/post")

exports.createPost = async (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtension = true
    console.log("fields", req.file);
    const file = req.file
    const { title, body } = req.body

    if (!(title && body)) {
        res.status(400).send("please input fields")

    }
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log("random", r);
    let slug = title.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    slug = slug + r

    const postContent = await Post.create({
        slug: slug,
        title: title,
        body: body,
        image: file
    })
    console.log("postContent", postContent);
    res.status(200).json({ message: "success", postdata: postContent })
}

exports.updatePost = async (req, res) => {
    const { title, content } = req.body
    const id = req.params.id
    const post = Post.findById({ id })
    console.log("post", req);
    const slug = title?.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    const body = {
        title: req.body.title ? req.body.title : post.title,
        body: req.body.content ? req.body.content : post.body,
    }
    const result = await Post.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    });
    if (result) {
        res.status(201).send({ message: "Post updated successfully", post: result })
    }
}


exports.deletePost = async (req, res) => {

    const id = req.params.id

    const result = await Post.findByIdAndDelete(id);

    if (result) {

        return res.status(200).json({ message: "post deleted successfully" ,data:result })

    } else {

        return res.status(400).json({ message: "Post is not found" })
    }

}

exports.getAllPost = async (req, res) => {

    const result = await Post.find()
        .select("_id title body slug image created");

    if (result) {
        return res.status(200).json({
            result
        });
    } else {
        return res.status(400).json({
            message: "Success",
            data: "not found"
        });
    }
}

exports.getSinglePost = async (req, res) => {
    const id = req.params.id
    const result = await Post.findOne({ slug: id })
        .select("_id title body slug created");

    if (result) {
        return res.status(200).json({
            message: "Success",
            data: result
        });
    } else {
        return res.status(400).json({
            message: "Success",
            data: "not found"
        });
    }
}