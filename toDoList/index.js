const express = require("express")
const bodyParser = require("body-parser") 

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');

// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/index.html")
// } )
var dolist = [];
var workItems = [];
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();

var currentDay = today.toLocaleDateString("en-US", options);
//output   like  this :        "Wednesday, October 25, 2023"


app.get("/",(req,res)=>{
    res.render("list",{EcurrentTitle:currentDay,EjsTodolist:dolist})
})

app.post("/",(req,res)=>{
    let todo = req.body.todo
    let title = req.body.list
    if(title === 'Works'){
        workItems.push(todo)
        res.redirect("/work")
    }else{
        dolist.push(todo)
        res.redirect("/")
    }

})

app.get("/work",(req,res)=>{
    res.render("list",{EcurrentTitle:"Works",EjsTodolist:workItems})
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.listen(3000, function(){
    console.log("game on!");
})



