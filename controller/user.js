const crypto = require('crypto');
const user = require("../models/user")
const{ createUser }= require("../service/user")
const URLmodel = require('../models/url');
const {v4: uuidv4}= require("uuid")
const { setuser, getuser } = require("../service/auth")
const { restrictionlogin }= require("../middleware/auth")
const sendVerificationMail = require("../service/sendMail");



async function handleusersignup(req, res) {
    console.log("handlesignup")
    const{email}= req.body;

    const allurls= await URLmodel.find({})

    const token = crypto.randomBytes(32).toString("hex");
    await createUser(req.body, token);

    sendVerificationMail(email, token);

    
     return res.render("signup-success", {
      message: "A verification email has been sent to your email address. Please check your inbox!",
      redirectUrl: "https://mail.google.com/mail/u/0/#inbox"
    });
}

async function handleuserlogin(req, res) {
    console.log("handlelogin")
    const allurls= await URLmodel.find({})

    const{ email, password }= req.body;

console.log("err", req.body)
    const userdata = await user.findOne({ email, password });
    console.log("err", userdata)

    if(!userdata){  
        console.log("err")
        return res.render("login", {
            error: "Invalid Username and Password"
        })
    }

    const sessionId = uuidv4();
    setuser(sessionId, userdata);
    res.cookie("uid", sessionId, {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000
});
     console.log(sessionId)
    return res.redirect("/");
}

module.exports = {

    handleusersignup,
    handleuserlogin
}