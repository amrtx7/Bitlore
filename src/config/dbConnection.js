const mongoose = require("mongoose")

const dbConnect = async ()=>{
    try{
        console.log("Mongo URI exists:", !!process.env.CONNECTION_STRING);
        const connection = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database connected to db",connection.connection.name,"at port",connection.connection.port)
    }catch(err){
        console.log("Connection me error  hogya bhai\n",err)
    }
}
    
module.exports = dbConnect







