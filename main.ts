import app from 'express';

let listenPort = process.env.PORT || 5000;

app.application.listen(listenPort, ()=> {
  console.log("server running on port "+ listenPort);
})