const express = require("express")

const app = express()

let listenPort = process.env.PORT || 5000;

app.use(express.static("build"))
app.listen(listenPort, ()=> {
  console.log("server running on port "+ listenPort);
})