const mongoose = require('mongoose')
const slugify = require('slugify')
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
    },
    slug:String
},{timestamps:true})

blogSchema.pre('save',function(){
    this.slug = slugify(this.title,{lower:true})
})

const Blogs = mongoose.model('blogs',blogSchema)    
module.exports = Blogs