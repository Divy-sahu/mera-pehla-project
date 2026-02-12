require("dotenv").config();
const express= require("express")
const path = require("path")

const { connectmondodb }= require("./connect")
const cookieParser = require('cookie-parser');

const staticroute = require("./routes/staticrouter")
const userroute= require("./routes/user")
const urlroute = require("./routes/url")
const { restrictionlogin, checkuser }= require("./middleware/auth")
const app= express();
const port= 8001;
console.log(process.env.MAIL_USER);
console.log(process.env.MAIL_PASS);


connectmondodb('mongodb://localhost:27017/short-url').then(()=> console.log("mongodb connected!!"))
app.use(cookieParser()); 
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended: true}))


app.use("/", checkuser, staticroute)
app.use("/user", userroute)
app.use("/url",restrictionlogin, urlroute)





app.listen(port,()=>console.log(`server started at ${port}`))