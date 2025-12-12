const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports.protectedRoute = async(req,res,next)=>{
    // const userid = req.params.id
    // const token = req.cookies.jwt
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const user = await User.findOne({_id:decoded.id})
    // if(!user){
    //     res.redirect("/auth/login");
    // }else{
    //     if(userid!=user._id.toString()){
    //         console.log('ab toh tu gaya bete!\n')
    //     }
    //     return next();

    // }
    res.render('notfound')
    next()

}