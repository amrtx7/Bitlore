const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

const dbConnect = require('./config/dbConnection')
dbConnect()

const path = require("path")
app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))

const {checkUser} = require("./middlewares/authMiddleware")

app.use(checkUser)



const authRoutes = require("./routes/authRoutes")
app.use(authRoutes)
const navRoutes = require("./routes/navRoutes")
app.use(navRoutes)

PORT = process.env.PORT || 3001

app.listen(process.env.PORT,()=>{
    console.log("Server is running at port",process.env.PORT)
})