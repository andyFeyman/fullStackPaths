const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const { Http2ServerRequest } = require("http2");

const app  = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
})


app.post("/", function(req,res){
   // const url = "https://api.openweathermap.org/data/2.5/weather?q=Hongkong&APPID=c799536e71a2ee7350c9ffe50f8e770e"
    const appid = "c799536e71a2ee7350c9ffe50f8e770e"
    const userCity = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&APPID="+appid+"&units=metric"
    https.get(url,function(respone){
        console.log(respone.statusCode);
        respone.on("data",function(data){
            const weatherJson = JSON.parse(data)
            const temp = weatherJson.main.temp
            const description = weatherJson.weather[0].description
            const weatherIcon = weatherJson.weather[0].icon
            res.write("<h1>the temp  is :<em>"+temp+" </em>degrees celsius </h1><br>")
            res.write("<h2>this is the weather detail: "+description+"<h2>")
            //https://openweathermap.org/img/wn/10d@2x.png
            res.write("<img src='https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png'>")
            res.send()
        })
        
    })
   
})




app.listen(3000,function(){
    console.log("Server listen on : 3000!");
})