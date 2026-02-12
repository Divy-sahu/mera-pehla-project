const User = require("../models/user")


async function verifyEmail(req, res) {
  const { token } = req.query;

console.log("token", token, req.query)
  const userdata = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() }
  });

 
  if (!userdata) {
    return res.send("Invalid or expired link");
  }

  userdata.isverified = true;
  userdata.verifyToken = undefined;
  userdata.verifyTokenExpiry = undefined;

   



  await userdata.save();

  return res.render("login",{
    verified: "Email verified successfully. You can login now."
  }
  );
} 

module.exports ={

    verifyEmail

}