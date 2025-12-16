module.exports.handleErrors = (err,res)=>{
    let errors = {username:"",name:"",email:"",password:""}
    console.log("handleErrors me agaya means auth me kuch toh hua h!!!\n")
    console.log(err)

    //for login
    if(err.message==="Email cannot be empty"){
        errors.email = "Email cannot be empty"
    }
    if(err.message==="Enter a valid email"){
        errors.email = "Enter a valid email"
    }
    if(err.message === "Password cannot be empty"){
        errors.password = "Password cannot be empty"
    }
    if(err.message === "Incorrect Password"){
        errors.password = "Incorrect Password"
    }
    if(err.message === "User is not registered"){
        errors.email = "User is not registered"
    }


    if(err.keyValue.email){  
        errors.email = `Email : ${err.keyValue.email} is already registered`
    }
    if(err.keyValue.username){  
        errors.username = `Username : ${err.keyValue.username} is already registered`
    }
    
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach((error)=>{
            errors[error.path] = error.message
        })
    }
    res.status(400).json({errors})
}
module.exports.handleBlogErrors = (res,err)=>{
    let errors = {
        success:false,
        empty:"",
        limit:{
            title:"",
            content:"",
        },
        auth:""
    }
    if(err.reason == "empty"){
        errors.empty = "Both Title and Content are required fields!"
    }
    if(err.limitExceeded){
        if(err.title){
            errors.limit.title = "Title should not be more than 50 chars"
        }else{
            errors.limit.content = "Content should not be more than 500 chars"
        }
    }
    if(err.user=="null"){
        errors.auth = "User not authenticated"
    }
    console.log("handleBlogError invoked...\n")
    console.log(errors);
    console.log("_______________________________________________")
    return res.status(400).json({errors})
}