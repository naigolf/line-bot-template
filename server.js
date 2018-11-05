const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var Token = process.env.TOKEN || "xxx";

app.get('/',function (req, res) {
    res.end("ok bot")
    })

app.post('/webhook', (req, res) => {
  var  msg = req.body.events[0].message.text
  var replyToken = req.body.events[0].replyToken
	  sendText(replyToken, msg)
   res.sendStatus(200)
})

/////////////////////////////////////
function sendText (replyToken, msg) {
  let data = {
    to: replyToken,
    messages: [
      {
        type: 'text',
        text: msg
      }
    ]
  }


//////////////////////////////////////
request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Token
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  })
}



app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

