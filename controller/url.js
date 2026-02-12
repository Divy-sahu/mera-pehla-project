const { nanoid } = require("nanoid");
const URLmodel = require('../models/url');
const { render } = require("ejs");

// Function to generate short URL
async function handlegenerateshorturl(req, res) {
  const body = req.body;
  // console.log("body", req)
  console.log("body", body.url)
  // Validate if URL exists in the request body
  if (!body.url) return res.status(400).json({ error: 'url is required' });

  // Validate URL format using the built-in URL constructor
  try {
    new URL(body.url); // This will throw an error if the URL is invalid
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // Generate a unique short ID for the URL (8 characters)
  // Generate a unique short ID for the URL (8 characters)
  const shortID = nanoid(8);
  console.log("Generated shortId:", shortID); 

  try {
    // Insert the new short URL into the database
    await URLmodel.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    // Respond with the generated short URL ID
    return res.json({ id: shortID });
  } catch (err) {
    // If there is a MongoDB error, catch and send an error response
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate short URL' });
  }
}

async function geturlwithid(req, res){

 const { shortid } = req.params;
 
 

  try{

      const urlData = await URLmodel.findOneAndUpdate({ shortId: shortid },{
    $push: { // Push a new object to the visitHistory array
      visitHistory: { 
        timestamp: new Date().toISOString() // You can also use `new Date()` if you prefer the date format
      }
    }
  });

  console.log("data", urlData.visitHistory)


    if(!urlData){
      res.send(400).json({message: "send correct id"})
    }

    return res.redirect(urlData.redirectURL); 

  }
  catch(err){

    console.log("error",err);
    return res.status(500).json({message:"failed to redirect"})

  }

  
}

async function getanalytics(req, res) {
  const shorId=  req.params.shortid;
  console.log("data", shorId)

  try{

  const data= await URLmodel.findOne({ shortId: shorId  });
  console.log("datablock", data)

  if(!data){

    return res.status(404).json({ message: "ID not found"})
  }

  return res.status(200).json({visitedhistory: data.visitHistory})
}
catch(err){

  return res.status(500).json({ message: `error ${err}`})

}
  
}


async function testurl(req, res){

  const allurls= await URLmodel.find({})

  return res.render("home", {
    urls: allurls,
    name: "divyansh"
  });
}


async function formgenerateurl(req, res) {

  
  const body = req.body;
  // console.log("body", req)
  console.log("body", body.url)
  // Validate if URL exists in the request body
  if (!body.url) return res.status(400).json({ error: 'url is required' });

  // Validate URL format using the built-in URL constructor
  try {
    new URL(body.url); // This will throw an error if the URL is invalid
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // Generate a unique short ID for the URL (8 characters)
  // Generate a unique short ID for the URL (8 characters)
  const shortID = nanoid(8);
  console.log("Generated shortId:", shortID); 

  try {
    // Insert the new short URL into the database
    await URLmodel.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
       const allurls= await URLmodel.find({})


    // Respond with the generated short URL ID
    return res.render("newhome", {
      urls: allurls,
      id:shortID
    })

  } catch (err) {
    // If there is a MongoDB error, catch and send an error response
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate short URL' });
  }
}


module.exports = {
  handlegenerateshorturl,
  geturlwithid,
  getanalytics,
  testurl,
  formgenerateurl

};
