const express = require("express");
require("../src/db/conn");

const UsersDetails = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Handaling post request (adding new data)

app.post("/user", async (req,res) => {
    try{
        const addingUserRecords = new UsersDetails(req.body)
        console.log(req.body);
        const insertUserData = await addingUserRecords.save();
        res.status(201).send(insertUserData);
    }catch(e){
        res.status(400).send(e);

    }
})

//Handaling get request (Reading data)

app.get("/user", async (req,res) => {
    try{
        const getUserDetails = await UsersDetails.find({});
        res.send(getUserDetails);
    }catch(e){
        res.status(400).send(e);

    }
})

//Handaling get request for individual user (Reading data for individual user)
app.get("/user/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const getUserDetail = await UsersDetails.findById(_id);
        res.send(getUserDetail);
    }catch(e){
        res.status(400).send(e);

    }
})

//Handaling patch request  (Updating data)
app.patch("/user/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        //const { id } = req.params;
        //const {Name,UserName} = req.body;
        const _Name = req.body.Name;
        const _UserName = req.body.UserName;
        const _Password = req.body.Password;

        //const UserDetail = await UsersDetails.findById(_id);

        if(_Name){
            //UserDetail.Name = _Name;
            const UserDetail = await UsersDetails.updateOne({_id},{
               $set:{
                   Name : _Name
               } 
            });
        }
        if(_UserName){
            //UserDetail.Name = _Name;
            const UserDetail = await UsersDetails.updateOne({_id},{
               $set:{
                UserName : _UserName
               } 
            });
        }

        if(_Password){
            res.send("You Canot Update Password.");
        }
        
        res.send(`User with ${_id} has been updated.`);
    }catch(e){
        res.status(500).send(e);
    }
})

//Handaling delete request (Deleting data)
app.delete("/user/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const UserDetail = await UsersDetails.findByIdAndDelete(_id);
        res.send(UserDetail);
    }catch(e){
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log(`connection is live at port no. ${port}`);
})