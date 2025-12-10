module.exports.getAbout = (req,res)=>{
    res.render("about")
}
module.exports.getHome = (req,res)=>{
    res.render("main")
}
module.exports.getContacts = (req,res)=>{
    res.render("contacts")
}
module.exports.getUsers = (req,res)=>{
    res.render("users")
}
