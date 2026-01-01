const Blogs = require("../models/blogs")
const User = require("../models/user")

module.exports.getAbout = (req,res)=>{
    res.render("about")
}
module.exports.getHome = async (req,res)=>{
    const blogs = await Blogs.find().sort({createdAt:-1}).populate('author')
    // console.log(blogs) for debugging purpose
    res.render("main",{blogs})
}
module.exports.getContacts = (req,res)=>{
    res.render("contacts")
}
module.exports.getProfile = async (req,res)=>{
    const username = req.params.username
    const profile = await User.findOne({username})
    const blogs = await Blogs.find({author:profile._id}).sort({createdAt:-1}).populate('author')
    const blogsLength = blogs.length
    let isUser = true
    if(username !== res.locals.user.username) isUser = false 
    res.render('profile',{profile,blogs,isUser,blogsLength})
}
// module.exports.getUsers = (req,res)=>{
//     res.render("users")
// }
 