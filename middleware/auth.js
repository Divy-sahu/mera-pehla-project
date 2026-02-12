const { getuser } = require("../service/auth")
const express= require("express");

async function restrictionlogin(req, res, next) {
    const useruid = req.cookies.uid;

console.log("cookie issue",useruid);
    

    if(!useruid) 
        {
            
            return res.redirect("/login")};

    const user = getuser(useruid);
    console.log("cookie issue",user);

    if(!user) 
        {
            console.log("user issue");
            return res.redirect("/login")
        };
            req.user = user;
        console.log("requser", req.user, user);
        next()
        
    
}

async function checkuser(req, res, next) {
    const useruid = req.cookies.uid;

    const user = getuser(useruid);

      req.user = user;
        console.log("requser", req.user, user);
        next()
        
}

module.exports={
    restrictionlogin,
    checkuser

}