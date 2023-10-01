const bodyParser = require("body-parser");
const { log } = require("console");
const express = require("express")
const http = require("https");
const { PassThrough } = require("stream");
const {mailUrl,Authorization} = require("./config.js")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html")
})


const options = {
    method : "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization':Authorization,

      },
}

const url = mailUrl;

//var yesOrNo = true;

app.post("/signup",function(req,res){
    
    const email = req.body.emailAddress;
    const firtName = req.body.firtname;
    const lastName = req.body.lastname;

    const postdata = JSON.stringify({
        "email": email,
        "fields": {
          "name": firtName,
          "last_name": lastName,
        },
        "groups": []
    });

    const mailRequest = http.request(url,options,function(respone){
        console.log("this is mail request: "+respone.statusCode);

        // 不能写成 XXX === 201 || 200, 这样无法有OR的效果
        // http.request中回调函数没有request对象，这里调用的是外部回调方法的request
        if(respone.statusCode === 201 || respone.statusCode === 200){
            //res.send("this is ok")
            res.sendFile(__dirname+"/success.html")
        }else{
            //res.send("this is fail")
            res.sendFile(__dirname+"/fail.html")
        }
        respone.on("data",function(data){
            const resData = JSON.parse(data);
            console.log(resData);

        })
    })

    mailRequest.write(postdata);
    mailRequest.end(); 

    
})



app.listen(3000,function(){
    console.log("Server is running on port:3000!");
})



