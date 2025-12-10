const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }   
},{timestamps:true})

const Blogs = mongoose.model('blogs',blogSchema)    
module.exports = Blogs