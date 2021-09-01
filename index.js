const express = require('express');
const app = express();
const request = require('request-promise-native');
const dfff = require('dialogflow-fulfillment');
const { resolve } = require('uri-js');
const { diff } = require('semver');
const { https } = require('follow-redirects');
app.get('/', (req, res) => {
    res.send("We are live")
})
app.post('/', express.json(), (req, res) => {
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });
    

    // json test
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

    //test
    function demo(agent){
      agent.add("Sending response from Webhook server 아아아아아아 ㅈ같다 ~~~")
    }
    
    //product 전체 보내기 
    function ProudctAPI() {
      const url = "http://192.168.64.1:8080/rooms/page/1";
      console.log("weatherAPI: url=", url);
      return new Promise((resolve, reject) => {
          https.get(url, function (res) {
              console.log("**************************");
              console.log(res.statusCode, res.headers);
              var json = "";
              res.on("data", function (chunk) {
                  // console.log("received JSON response: " + chunk);
                  json += chunk;
              });

              res.on("end", function () {
                  let jsonData = JSON.parse(json);
                  // console.log("찐 결과값은 : " +json)
                  resolve(json);
              });
          });
      });
  }
    function productAll(agent){
      var abcd =  ProudctAPI()
          .then(result => {
            agent.add(result);
            agent.end("");
          })
          .catch((err) => agent.add(err));
    }

    // //공공 데이터 테스트 
    // function getWeather(agent) {
    //   console.log("----------------getWeather");
    //   return weatherAPI()
    //       .then(result => 
    //         agent.add( new dfff.Payload(agent.UNSPECIFIED, result, {sendAsMessage: true, rowPayload : true })))
    //       .catch((err) => agent.add(err));
    // }
  
    // function weatherAPI() {
    //     const url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22";
    //     console.log("weatherAPI: url=", url);
    //     return new Promise((resolve, reject) => {
    //         https.get(url, function (res) {
    //             console.log("**************************");
    //             console.log(res.statusCode, res.headers);
    //             var json = "";
    //             res.on("data", function (chunk) {
    //                 console.log("received JSON response: " + chunk);
    //                 json += chunk;
    //             });
  
    //             res.on("end", function () {
    //                 let jsonData = JSON.parse(json);
    //                 let r = "The weather is " + jsonData.weather[0].description;
    //                 resolve(jsonData);
    //             });
    //         });
    //     });
    // }
    

    //intent 연결
    var intentMap = new Map();
    
    intentMap.set('Getweather',demo)
    // intentMap.set('test', getWeather)
    intentMap.set('productAll', productAll)
    intentMap.set('demo', customPayloadDemo)
    agent.handleRequest(intentMap);
} )
app.listen(3000, ()=>console.log("Server is live at port 3000"))

