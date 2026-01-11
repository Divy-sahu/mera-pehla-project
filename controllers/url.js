const { nanoid } = require("nanoid")
const URL = require("../models/url")
async function generateshorturl(req, res) {
    const body = req.body;
    if (!body.url) { return res.status(400).json({ Message: "Url is required" }) };

    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirecturl: body.url,
        visitHistroy: [],
    })
    return res.json({Id: shortID})
}

module.exports={
    generateshorturl

}