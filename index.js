const express = require("express");
const urlroute = require("./routes/url")
const {connecttomongoDB}= require("./connect")

const app= express();
app.use(express.json());

app.use("/url", urlroute);

app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});


const port = 8001;
connecttomongoDB("mongodb://localhost:27017/short-url").then(()=> console.log("mongodb connected"))

app.listen(port, ()=> console.log(`server${port} started successfully`));


