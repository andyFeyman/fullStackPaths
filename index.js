const express = require("express")
const bodyParser = require("body-parser") 
const mongoose = require('mongoose');
const _ = require("lodash")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/toDoListDB');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');

// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/index.html")
// } )

const ItemSchema = new mongoose.Schema({
    content: String
});
const ListSchema = new mongoose.Schema({
    name:String,
    items:[ItemSchema]
})

const Item = mongoose.model("Items",ItemSchema);
const List  = mongoose.model("Lists",ListSchema)

const item1 = new Item({content:"this is a toDoList app"})
const item2 = new Item({content:"you can click the left checkboxes to delete this"})
const item3 = new Item({content:"click the + button to create a new item"})

const defaultItems = [item1,item2,item3]

const todayList = new List({name:"ToDay",items:[]})

app.get("/",(req,res)=>{
    //item.find({}).then(result=>{}).catch(err=>{});

    Item.find({}).then(foundItems =>{
        if(foundItems != 0){
            res.render("list",{EcurrentTitle:"ToDay",EjsTodolist:foundItems})
        }else{
            res.render("list",{EcurrentTitle:"ToDay",EjsTodolist:defaultItems})
        }       
    }).catch(err=>{
        console.log(err);
    });

})


app.get("/:listName",(req,res)=>{

    const listroute = _.capitalize(req.params.listName);
    
    List.findOne({name:_.capitalize(listroute)}).then(async listObject=>{
        if(!listObject){
            const list = new List({
                name:listroute,
                items:defaultItems
            })
            await list.save();
            res.render("list",{EcurrentTitle:listroute,EjsTodolist:defaultItems})
            
        }else{
            res.render("list",{EcurrentTitle:listroute,EjsTodolist:listObject.items})
        }  
    }).catch(err=>{
        console.log(err);
    })
})

app.post("/delete",async(req,res)=>{
    const itemid = req.body.item
    const listname = req.body.list
    
    await List.updateOne({name:listname},{$pull:{items:{_id:itemid}}}).exec();
    res.redirect("/"+listname)
})

app.post("/",async (req,res)=>{
    const itemname = req.body.item
    const listname = req.body.list
    
    if(listname === 'ToDay'){

        const newitem = new Item({content:itemname})
        await newitem.save()
        res.redirect("/")
    }else{
        List.findOne({name:listname}).then(async listObject=>{
            if(listObject){
                const newitem = new Item({content:itemname})
                listObject.items.push(newitem)
                await listObject.save()
                res.redirect("/"+listname)
            }else{
                console.log("no this list");
            }           
        }).catch(err=>{
            console.log(err);
        })
        
    }

})







app.get("/about",(req,res)=>{
    res.render("about")
})

app.listen(3000, function(){
    console.log("running on 127.0.0.1:3000, game on!");
})



