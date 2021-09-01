
const dfff = require('dialogflow-fulfillment');
const { request } = require('express');

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

function demo(agent){
    agent.add("Sending response from Webhook server 아아아아아아 ㅈ같다 ~~~")
}
function productAll(agent){
    const url = "https://api.princle.co.kr/goods/all";
    request(url,(err, response, body)=>{
        console.log(body);
        dfff.Payload(agent.UNSPECIFIED, body, {sendAsMessage: true, rowPayload: true})
    })
}