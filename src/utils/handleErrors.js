const handleErrors = (err,res)=>{
    let errors = {name:"",email:"",password:""}
    console.log("Handle errors me agaya")
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


    console.log(err.code)
    if(err.code===11000){  
        errors.email = `Email : ${err.keyValue.email} is already registered`
    }
    
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach((error)=>{
            errors[error.path] = error.message
        })
    }
    res.status(400).json({errors})
}
module.exports = handleErrors