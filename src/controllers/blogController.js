const Blogs = require('../models/blogs')
const jwt = require('jsonwebtoken') 
const User = require('../models/user')
const { handleBlogErrors } = require('../utils/handleErrors')

module.exports.getUserBlogs = async (req,res)=>{
    const userId = res.locals.user._id.toString()
    const blogs = await Blogs.find({ author:userId }).sort({createdAt:-1}).populate('author')
    // console.log("User blogs\n")   for debugging purpose
    // console.log(blogs)
    res.render("blogs",{blogs})
}

module.exports.getWriteBlogs = (req,res)=>{
    res.render("writeBlogs")
}
module.exports.postWriteBlogs = async (req,res)=>{
    try {
        const user = res.locals.user
        const {title, content} = req.body
        // console.log("\n",title, content,"\n")  for debugging purpose
        // Validate input
        if(!title || !content){
            throw {
                user:user.name,
                reason:"empty"
            }
        }
        if(title.length>100){
            throw{
                user:user.name,
                limitExceeded:true,
                title:true,
                content:false
            }
        }
        if(content.length>1000){
            throw{
                user:user.name,
                limitExceeded:true,
                title:false,
                content:true
            }
        }
        
        // Get authenticated user from res.locals (set by checkUser middleware)

        // console.log("blog by : ",user.name,"\n"); for debugging purpose
        const userId = req.params.userid
        if(userId !== user._id.toString()){
            throw {
                user:"null"
            }
        }
        
        // Create and save blog
        const blog = new Blogs({
            title: title.trim(),
            content: content.trim(),
            author: user._id,
            slug:""
        })
        
        await blog.save()
        
        res.status(201).json({ 
            success: true, 
            message: 'Blog posted successfully!'
        })
    } catch (err) {
        console.error('Error posting blog:', err,"\n")
        handleBlogErrors(res,err)
    }
}
module.exports.getBlog = async(req,res)=>{
    // console.log("in getblog controller\n") for debugging
    const blogName = req.params.blogName
    const blog = await Blogs.findOne({slug:blogName}).populate('author')
    // console.log(blog) for debugging putpose
    res.render('blogPage' , {blog})
}
module.exports.deleteBlog = async (req,res)=>{
    const blogID = req.params.id
    try {
        const blog = await Blogs.findOneAndDelete({_id:blogID}).populate('author')
        console.log("Blog to be deleted -",blog.slug)
        console.log("Blog by",blog.author.username)
        return res.status(200).json({
            ok:true,
            username:blog.author.username
        })
        
    } catch (err) {
        console.log(err)
    }
}
module.exports.getEditBlog = async (req,res) => {
    const id = req.params.id;
    const blog = await Blogs.findOne({_id:id})
    console.log("Jaa kr edit")
    console.log(blog.title)
    res.render('editBlog',{blog})
}
module.exports.putEditBlog = async(req,res) => {
    console.log("hi")
}