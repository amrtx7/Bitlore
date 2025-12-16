const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { isEmail } = require('validator')
const {handleErrors} = require("../utils/handleErrors")

const maxAge = 3*24*60*60
const maxAge_sec = maxAge*1000

module.exports.signup_get = (req,res)=>{
    res.render("signup")
}
module.exports.login_get = (req,res)=>{
    res.render("login")
}
module.exports.signup_post = async (req,res)=>{
    let {username,name,email,password} = req.body
    console.log("SIGNUP BODY =>", req.body);
    try {
        const user = new User({
            username,
            name,
            email,
            password
        })
        console.log("signup post me agya")
        await user.save()
        console.log(user,"\nadded to db\n")
        // creating to token to store in cookies
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: maxAge
        })
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge:maxAge_sec
        })
        res.status(201).json({user:user._id})
    } catch (err) {
        handleErrors(err,res)
    }
}
module.exports.login_post = async (req,res)=>{
    let {email,password} = req.body
    
    try {
        if(email==""){
            throw new Error("Email cannot be empty")
        }
        if(password==""){
            throw new Error("Password cannot be empty")
        }
        if(!isEmail(email)){
            throw new Error("Enter a valid email")
        }
        const user = await User.findOne({email})
        if(user){
            const match = await bcrypt.compare(password,user.password)
            if(match){
                //creating jwt token
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
                    expiresIn:maxAge
                })
                res.cookie('jwt',token,{
                    httpOnly:true,
                    maxAge:maxAge_sec
                })
                res.status(200).send({ user:user._id })
            }else{
                //password is incorrect
                throw new Error("Incorrect Password")
            }

        }else{
            // there is no user exist with the input email
            throw new Error('User is not registered')
        }
    } catch (err) {
        handleErrors(err,res)
    }
}
module.exports.logout_get = (req,res)=>{
    res.cookie('jwt',"",{maxAge:1})
    res.redirect('/')
}
module.exports.users_get = async (req,res)=>{
    const users = await User.find()
    res.render("users",{users})
}