const { MinKey } = require('mongodb')
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
        ref:"user",
    },
    slug:String
},{timestamps:true})





// suffix slug in blogs
function generateRandomNumber(min,max){
    return Math.floor(Math.random() * (max-min+1) + min);
}
blogSchema.pre('save',function(){
    let n = generateRandomNumber(10000,99999);
    this.slug = slugify(this.title,{lower:true})+ `-${n}`;
})

const Blogs = mongoose.model('blogs',blogSchema)    
module.exports = Blogs