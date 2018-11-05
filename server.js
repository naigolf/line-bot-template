const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000)) 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var Token = process.env.TOKEN || "xxx";

app.get('/',function (req, res) {
    res.end("ok bot")
    })

app.post('/webhook', (req, res) => {
  var msgbot = req.body.events[0].message.text
  var replyToken = req.body.events[0].replyToken  

    res.sendStatus(200)
    console.log(msgbot);
    sendText(replyToken, msgbot)
})

/////////////////////////////////////
function sendText (replyToken, msgbot) {
  let data = {
    to: replyToken,
    messages: [
      {
        type: 'text',
        text: msgbot
      }
    ]
  }


//////////////////////////////////////
request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ''Bearer '+ Token
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  })
}


app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

