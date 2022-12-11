
const Post=require("./../model/post")

exports.createPost =async (req, res) => {
  
    const { title, content } = req.body
    
    if (!(title && content)) {
        res.status(400).send("please input fields")
        
    }
    const slug=title.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
    const postContent=await Post.create({
        slug:slug,
        title:title,
        body:content
    })
    res.status(201).send({ message: "Success", data: postContent })

}

exports.updatePost =async (req, res) => {
  
    const { title, content } = req.body
    const id=req.params.id
   const post=Post.findById({id})
   
    const slug=title?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
    console.log("post",post.body);
   post.title=title?title:post.title
   post.body=content?content:post.body
   post.slug=slug?slug:post.slug

    res.status(201).send()

}
