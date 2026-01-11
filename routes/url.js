const express= require("express");
const {generateshorturl} =require("../controllers/url")

const router = express.Router();

router.post('/', generateshorturl );

module.exports= router;