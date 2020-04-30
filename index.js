const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'XECDjsxpLsOMsh1BFLbJG4YzabzviASDRRqAHKBMge4nLjkkOGbyDlIdiIZQzWwoUAVE3CpiFlqCzH2gzVI4MmpZ6I56x3DLNt7AYBfXr6Ay7L17ND1rcOiPCv59Bixf5f7axMcyzTu/BBjcnpjM6wdB04t89/1O/w1cDnyilFU',
  channelSecret: 'dcb2f6a840a23832c5693756743222af'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);