const mongoose = require("mongoose")
const { isEmail,isStrongPassword } = require('validator')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        // unique:[true,"Email already registered"],  custom error
        unique:true, //mongoose error with code 11000
        validate:[isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password must be at least 8 characters long"]
        //validation expected soon
    }
})

userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(this.password,salt)
    this.password = hash; 
})

module.exports = mongoose.model('user',userSchema)