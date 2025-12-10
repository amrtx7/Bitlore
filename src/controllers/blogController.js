const Blogs = require('../models/blogs')
const jwt = require('jsonwebtoken') 
const User = require('../models/user')

module.exports.getBlogs = (req,res)=>{
    res.render("blogs")
}
module.exports.getWriteBlogs = (req,res)=>{
    res.render("writeBlogs")
}
module.exports.postWriteBlogs = async (req,res)=>{
    console.log(req.body.title,req.body.content)
    return res.status(200).json({ success: true })
}

// module.exports.postWriteBlogs = async (req,res)=>{
//     try {
//         const {title, content} = req.body
//         console.log("\n",title, content,"\n")
//         return res.status(200).json({
//             success: true,
//             message: 'Blog posted successfully!',
//         })
//         // // Validate input
//         // if(!title || !content){
//         //     return res.status(400).json({ 
//         //         success: false, 
//         //         message: 'Both Title and content are required' 
//         //     })
//         // }
        
//         // // Get authenticated user from res.locals (set by checkUser middleware)

//         // const user = res.locals.user
        
//         // if(!user){
//         //     return res.status(401).json({ 
//         //         success: false, 
//         //         message: 'User not authenticated. Please login to post a blog.' 
//         //     })
//         // }   
        
//         // // Verify user ID matches route parameter (security check)
//         // const userId = req.params.userid
//         // if(userId !== user._id.toString()){
//         //     return res.status(403).json({ 
//         //         success: false, 
//         //         message: 'Unauthorized: User ID mismatch' 
//         //     })
//         // }
        
//         // // Create and save blog
//         // const blog = new Blogs({
//         //     title: title.trim(),
//         //     content: content.trim(),
//         //     author: user._id
//         // })
        
//         // await blog.save()
        
//         // res.status(201).json({ 
//         //     success: true, 
//         //     message: 'Blog posted successfully!',
//         //     blog: blog
//         // })
//     } catch (err) {
//         console.error('Error posting blog:', err)
//         res.status(500).json({ 
//             success: false, 
//             message: 'Failed to post blog. Please try again.',
//             error: err.message 
//         })
//     }
// }