const user = require("../models/user")

async function createUser(data,token) {

  console.log("signupdata", data,token)
  
  const{ name, email, password}= data;
    const tokenn = token;

   return await user.create({
    name,
    email,
    password,
    verifyToken: token,
    verifyTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
, 
  });

}

module.exports= {
    createUser
}