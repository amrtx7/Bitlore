const Blogs = require("../models/blogs")

module.exports.getAbout = (req,res)=>{
    res.render("about")
}
module.exports.getHome = async (req,res)=>{
    const blogs = await Blogs.find().sort({createdAt:-1}).populate('author')
    console.log(blogs)
    res.render("main",{blogs})
}
module.exports.getContacts = (req,res)=>{
    res.render("contacts")
}
// module.exports.getUsers = (req,res)=>{
//     res.render("users")
// }
