const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Blogs = require("../models/blogs")
const mongoose = require('mongoose')

//  Protects user-specific routes (e.g., /userid/write) — 
//  ensures the URL userid matches the logged-in user
//  Ex:
//  the user id is 1234 and user goes to route /1234/write
//  but user changes it to /1235/write
//  in that case the page should not be visible
module.exports.protectedRoute = async(req,res,next)=>{
    const userid = req.params.userid
    
    // Validate userid exists and is a valid ObjectId
    if(!userid || !mongoose.Types.ObjectId.isValid(userid)){
        return res.render('404notfound')
    }
    //this is the user who is in the write page
    // Check if the user exists in the db
    const user = await User.findOne({_id:userid})
    if(!user){
        return res.render('404notfound')
    }
    //this is the user who is currently the client
    const localUser = res.locals.user
    //if not authenticated ( from requireAuth middleware )
    if(!localUser){
        console.log("in protected route\nlocal user not logged in")
        return res.redirect('/auth/login')
    }
    // the both users should match, else its tampered
    if(user._id.toString() !== localUser._id.toString()){
        console.log('ab toh tu gaya bete!\n')
        return res.render('forbidden')
    }
    return next();

}




//  this is the middleware used to :
module.exports.requireBlogOwner = async (req,res,next) => {
    //  check if the blogid has been tamperedor not, only valid id moves forward
    if(!mongoose.Types.ObjectId.isValid(req.params.blogid)){
        return res.render('404notfound')
    }
    console.log('request object id is valid')

    //  fetch the blog from the blogid provided in the url
    const blog = await Blogs.findById(req.params.blogid).populate('author')
    if(!blog){
        return res.render('404notfound')
    }

    //  to check for the local user
    const localUser = res.locals.user;
    if(!localUser){  // user doesnt exist
        return res.redirect('/auth/login')
    }
    //  to check for the user who posted the blog
    const blogOwner = blog.author

    //  if the local user itself posted the blog
    if(localUser._id.toString() === blogOwner._id.toString() ){
        return next();
    }
    //admin gets access too if he is not the user itself
    else if(localUser.role === "admin") {
        return next();
    }
    //  if the local user is not whom posted the blog, then no rights
    //  permisson for read only
    else{
        console.log("in requireblogowner middleware")
        console.log("user id mismatch")
        return res.render('404notfound')
    }
}