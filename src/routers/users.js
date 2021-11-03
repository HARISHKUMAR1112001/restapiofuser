const express = require("express");
const  router = new express.Router();


const UsersDetails = require("../models/user");

//Handaling post request (adding new data)

router.post("/user", async (req,res) => {
    try{
        const addingUserRecords = new UsersDetails(req.body)
        const insertUserData = await addingUserRecords.save();
        res.status(201).send(insertUserData);
    }catch(e){
        res.status(400).send(e);

    }
})

//Handaling get request (Reading data)

router.get("/user", async (req,res) => {
    try{
        const getUserDetails = await UsersDetails.find({});
        res.send(getUserDetails);
    }catch(e){
        res.status(400).send(e);

    }
})

//Handaling get request for individual user (Reading data for individual user)
router.get("/user/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const getUserDetail = await UsersDetails.findById(_id);
        res.send(getUserDetail);
    }catch(e){
        res.status(400).send(e);

    }
})

//Handaling patch request  (Updating data)
router.patch("/user/:id", async (req,res) => {
    try{
        const _id = req.params.id;
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

        if(_Password && _Name && _UserName) res.send("You Canot Update Password.But user's name and username are updated.");
        if(_Password && _Name) res.send("You Canot Update Password.But user's name is updated.");
        if(_Password && _UserName) res.send("You Canot Update Password.But user's username is updated.");
        if(_Name && _UserName) res.send("User's name and username are updated.");
        if(_Name ) res.send("User's name is updated.");
        if(_UserName ) res.send("User's username is updated.");
        if(_Password ) res.send("You Canot Update Password.");
    }catch(e){
        res.status(500).send(e);
    }
})

//Handaling delete request (Deleting data)
router.delete("/user/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const UserDetail = await UsersDetails.findByIdAndDelete(_id);
        res.send(UserDetail);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;