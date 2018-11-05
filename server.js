const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000)) 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var Token = process.env.TOKEN || "xxx";
var access_token = 'Bearer {'+Token+'}'

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

function sendText(reply_token, msgbot) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': access_token
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msgbot
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        //console.log('status = ' + res.statusCode);
    });
}


app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

