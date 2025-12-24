const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Blogs = require("../models/blogs")
const mongoose = require('mongoose')


module.exports.protectedRoute = async(req,res,next)=>{
    const userid = req.params.userid
    const user = await User.findOne({_id:userid})
    const localUser = res.locals.user
    if(!user || !localUser){
        console.log("in protected route\n user not logged in")
        return res.redirect('/auth/login')
    }
    if(user._id != localUser._id.toString()){
            console.log('ab toh tu gaya bete!\n')
            return res.render('forbidden')
    }
    return next();

}

module.exports.requireBlogOwner = async (req,res,next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.render('404notfound')
    }
    console.log('request object id id valid')
    const blog = await Blogs.findById(req.params.id).populate('author')
    if(!blog){
        return res.render('/404notfound')
    }
    console.log('-------------------------------------------------------------------------')
    console.log(blog)
    console.log('-------------------------------------------------------------------------')
    
    const localUserId = res.locals.user._id;
    const blogOwnerId = blog.author._id
    console.log(localUserId," =========== ",blogOwnerId)
    console.log('-------------------------------------------------------------------------')


    
    if(localUserId.toString() === blogOwnerId.toString() ){
        console.log("XXXXXXXXXXXXXXXXXXXXX--------END-------XXXXXXXXXXXXXXXX")
        return next();
    }
    else{
        console.log("in requireblogowner middleware")
        console.log("user id mismatch")
        return res.render('404notfound')
    }
}