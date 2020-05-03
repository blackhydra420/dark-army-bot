console.log("app starting");

require('dotenv').config({path:__dirname + "/.env"});

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log("Inside webhook");
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  console.log("message send");
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(process.env.PORT || 3000, () => console.log("Listening to port 3000"));