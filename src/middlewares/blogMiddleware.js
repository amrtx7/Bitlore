const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports.protectedRoute = async(req,res,next)=>{
    const userid = req.params.userid
    const user = res.locals.user
    if(!user){
        console.log("in protected route\n user not logged in")
        return res.redirect('/auth/login')
    }
    if(userid!=user._id.toString()){
            console.log('ab toh tu gaya bete!\n')
            return res.render('forbidden')
    }
    return next();

}