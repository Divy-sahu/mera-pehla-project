const express = require("express")
const { handlegenerateshorturl, geturlwithid, getanalytics, testurl, formgenerateurl }= require("../controller/url")

const app = express();

const router = express.Router();


router.post("/", handlegenerateshorturl);
router.post("/form", formgenerateurl);
router.get("/test", testurl);
router.get("/:shortid",geturlwithid);
router.get("/analytics/:shortid", getanalytics)



router.get("/d", (req, res) => {
  res.send("Divyansh");
});

module.exports = router;