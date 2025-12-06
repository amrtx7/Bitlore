module.exports.getAbout = (req,res)=>{
    res.render("about")
}
module.exports.getHome = (req,res)=>{
    res.render("main")
}
module.exports.getContacts = (req,res)=>{
    res.render("contacts")
}
module.exports.getBlogs = (req,res)=>{
    res.render("blogs")
}
module.exports.getWriteBlogs = (req,res)=>{
    res.render("writeBlogs")
}
module.exports.postWriteBlogs = (req,res)=>{
    res.send("Blog submitted")
}
module.exports.getUsers = (req,res)=>{
    res.render("users")
}
