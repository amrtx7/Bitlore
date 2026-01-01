const Blogs = require('../models/blogs')
const jwt = require('jsonwebtoken') 
const User = require('../models/user')
const { handleBlogErrors } = require('../utils/handleErrors')


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
        
        // Get authenticated user from res.locals (set by checkUser middleware)
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
    const blogID = req.params.blogid
    try {
        console.log("in delete prakriya")
        const blog = await Blogs.findOneAndDelete({_id:blogID}).populate('author')
        return res.status(200).json({
            ok:true,
            username:blog.author.username
        })
        
    } catch (err) {
        console.log("nhihua delete prakriya")
        console.log(err)
    }
}
module.exports.getEditBlog = async (req,res) => {
    const id = req.params.blogid;
    const blog = await Blogs.findOne({_id:id}).populate('author')
    res.render('editBlog',{blog})
}
module.exports.putEditBlog = async(req,res) => {
    console.log("In puteditblog controller")
    try {
        let blog = await Blogs.findOne({_id:req.params.blogid}).populate('author')
        console.log(blog)
        const user = blog.author
        console.log("user",user)
        const {title, content} = req.body

        if(!title || !content){
            throw {
                user:user.name,
                reason:"empty"
            }
        }
        blog = await Blogs.findOneAndUpdate(
            {_id : blog._id},
            {$set : {
                title: title.trim(),
                content: content.trim(),
                author: user._id,
                slug:""
            }
            },
            {new : true}
        )
        
        res.status(201).json({ 
            success: true, 
            message: 'Blog updated successfully!'
        })
    } catch (err) {
        console.error('Error updating blog:', err,"\n")
        handleBlogErrors(res,err)
    }
}