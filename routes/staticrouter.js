const express= require("express");
const URLmodel = require("../models/url");
const {verifyEmail} = require("../controller/verifyemail")


const router = express.Router();

router.get("/", async(req, res)=>{

    console.log("requser login", req.user)

    if(!req.user){

        return res.redirect("/login")
    }

    const allurls= await URLmodel.find({ createdBy: req.user._id  })

    return res.render("newhome",{
            urls: allurls
            
        }
    )

})

router.get("/signup", async(req, res)=>{
    
    return res.render("signup")

})

router.get("/login", async(req, res)=>{
    

    return res.render("login")

})

router.get("/verify-email", verifyEmail)





module.exports = router;