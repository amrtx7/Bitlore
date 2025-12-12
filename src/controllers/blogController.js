const Blogs = require('../models/blogs')
const jwt = require('jsonwebtoken') 
const User = require('../models/user')
const { handleBlogErrors } = require('../utils/handleErrors')

module.exports.getBlogs = (req,res)=>{
    res.render("blogs")
}
module.exports.getWriteBlogs = (req,res)=>{
    res.render("writeBlogs")
}
module.exports.postWriteBlogs = async (req,res)=>{
    try {
        const user = res.locals.user
        const {title, content} = req.body
        console.log("\n",title, content,"\n")
        // Validate input
        if(!title || !content){
            throw {
                user:user.name,
                reason:"empty"
            }
        }
        if(title.length>50){
            throw{
                user:user.name,
                limitExceeded:true,
                title:true,
                content:false
            }
        }
        if(content.length>50){
            throw{
                user:user.name,
                limitExceeded:true,
                title:false,
                content:true
            }
        }
        
        // Get authenticated user from res.locals (set by checkUser middleware)

        console.log("blog by : ",user.name,"\n");
        // return res.status(200).json({success:true,message:null})
        
        //its not possible that ur in blog page and not a user
        // if(!user){
        //     return res.status(401).json({ 
        //         success: false, 
        //         message: 'User not authenticated. Please login to post a blog.' 
        //     })
        // }   
        
        // Verify user ID matches route parameter (security check)
        const userId = req.params.userid
        if(userId !== user._id.toString()){
            throw {
                user:"null"
                // message:"Unauthorized user. Login first!"
            }
        }
        
        // Create and save blog
        // const blog = new Blogs({
        //     title: title.trim(),
        //     content: content.trim(),
        //     author: user._id,
        //     slug:""
        // })
        
        // await blog.save()
        
        res.status(201).json({ 
            success: true, 
            message: 'Blog posted successfully!'
        })
    } catch (err) {
        console.error('Error posting blog:', err,"\n")
        handleBlogErrors(res,err)
    }
}