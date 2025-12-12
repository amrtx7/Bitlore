const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    if(!token){
        console.log("Not authenticated")
        return res.redirect('/auth/login')
    }else{
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                console.log(err)
                return res.redirect('/auth/login')
            }else{
                console.log("Authenticated")
                console.log('User permission granted',decoded)
                next()
            }
        })
    }
    
}
const checkUser = async (req,res,next)=>{
    const token = req.cookies.jwt
    if(!token){
        res.locals.user = null
        return next()
    }else{
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findOne({_id:decoded.id})
            res.locals.user = user
            return next()
        } catch (err) {
            res.locals.user = null
            console.log(err)
            return next()
        }
    }
}

module.exports = {requireAuth,checkUser}