const authorizeRole = (role)=>{
    return (req,res,next) => {
        console.log("in role middleware\n")
        console.log(res.locals.user.role)
        if(role === res.locals.user.role){
            return next();
        }else{
            res.render('404notfound')
        }
    }
}
module.exports = {authorizeRole}