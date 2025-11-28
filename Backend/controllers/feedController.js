const userModel = require("../models/userModel");
const Request = require('../models/IntractionModel');

exports.allUsers = async (req , res) => {

  try{
    const currentUser = await  userModel.findById(req.user.id);

    if(!currentUser) return res.status(400).json({error : "currentUser not found"})

     const userfriendId = await currentUser.Connections;
     const userIgnoreId = await currentUser.Ignore;
     const excludeUserIds = [currentUser._id , ...userfriendId , ...userIgnoreId];

     const users = await userModel.find( {_id : {$nin : excludeUserIds}});

     return res.status(201).json(users);
  }catch(err){
    console.log('feed err' , err);
    return res.status(404).json({error : 'User not found'})
  }
 }