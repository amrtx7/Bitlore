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
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    blogs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogs",
    }
},{timestamps:true})

userSchema.pre("save",async function(){
    // Hash password if it's modified or new
    if(this.isModified('password') || this.isNew){
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(this.password,salt)
        this.password = hash; 
    }
    
    //admin role based on email for new users (if role is default "user")
    if(this.isNew && this.role === "user"){
        const adminEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL
        if (adminEmails) {
            const adminEmailList = adminEmails.split(',').map(email => email.trim().toLowerCase())
            if (adminEmailList.includes(this.email.toLowerCase())) {
                this.role = "admin"
                console.log(`Admin role assigned to: ${this.email}`)
            }
        }
    }
})

module.exports = mongoose.model('user',userSchema)

















//just added roles in documents............... controller, middleware all pending