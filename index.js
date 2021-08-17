const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');
app.get('/', (req, res) => {
    res.send("We are live")
})
app.post('/', express.json(), (req, res) => {
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });
    function demo(agent){
        agent.add("Sending response from Webhook server 아아아아아아 ㅈ같다 ~~~")
    }
    function customPayloadDemo(agent){
        var payloadData = {
            "richContent": [
              [
                {
                  "title": "hello",
                  "rawUrl": "https://example.com/images/logo.png",
                  "accessibilityText": "Dialogflow across platforms"
                },
                {
                  "title": "hello",
                  "rawUrl": "https://example.com/images/logo.png",
                  "accessibilityText": "Dialogflow across platforms"
                },
                {
                  "title": "hello",
                  "rawUrl": "https://example.com/images/logo.png",
                  "accessibilityText": "Dialogflow across platforms"
                },
              ]
            ]
          }
          agent.add( new dfff.Payload(agent.UNSPECIFIED, payloadData, {sendAsMessage: true, rowPayload : true }))
    }
    var intentMap = new Map();

    intentMap.set('Getweather',demo)
    intentMap.set('demo', customPayloadDemo)
    agent.handleRequest(intentMap);
} )
app.listen(3000, ()=>console.log("Server is live at port 3000"))