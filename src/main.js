const express = require("express")
const app = express()

const path = require("path")
let listenPort = process.env.PORT || 5000;

app.listen(listenPort, ()=> {
  console.log("server running on port "+ listenPort);
})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.tsx'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})