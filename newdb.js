const express = require("express");
const mongoose = require("mongoose")

const app = express();
app.use(express.json())
mongoose.connect("mongodb+srv://sarkarjii534:" + encodeURIComponent("@sarkarop09") + "@cluster0.kazdxwe.mongodb.net/appuserplus")

const User =mongoose.model("Lists",{
    name:String,
    email:String,
    password:String
})

app.post("/signup",(req,res)=>{
    const names = req.body.names
    const email= req.body.email
    const password= req.body.password


    const user = new User({
        name:names,
        emai:email,
        password:password,
    })
    user.save().then(()=>{
        console.log("succesfully save")
    })

    res.json({
        msg:"Succesfully save the data"
    })

})


app.get('/list', (req, res) => {
   
    User.find({}).then(users => {
    
     
       return res.json(users);

    }).catch(err => {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    });
})




app.listen(3000,()=>{
    console.log("you sever is on https//localhost3000 ")
})

