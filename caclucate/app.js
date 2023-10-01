const express = require("express")
const bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req, res){
    //let num1 = req.params.
    //console.log(req.params);
    let n1 = Number(req.body.num1)
    let n2 = Number(req.body.num2)
    let addResult = n1 + n2
    res.send("this is what you got:"+addResult)
   
})

app.get("/bmiCalculator.html", (req,res)=>{
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/bimCalculate",(req,res)=>{
    let weight = Number(req.body.weight)
    let height = Number(req.body.height)
    let bmiResult = weight / (height*height)
    res.send("this is your BMI result:"+bmiResult)
})


app.listen(3000,function(){
    console.log("The Server is turn on at:3000")
})


