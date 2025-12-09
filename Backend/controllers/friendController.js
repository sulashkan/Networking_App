const { populate } = require("dotenv");
const Request = require("../models/IntractionModel");
const userModel = require("../models/userModel");

exports.friendList = async (req , res) => {
    try{
       const userId = req.user.id;
       const acceptUsers = await Request.find({$and:[
        {$or:[{from : userId} , {to:userId}]},
        {action : "Accept"}
       ]}
        ).populate({path:"from" , match:{_id:{$ne : userId}}})
         .populate({path:"to" , match:{_id:{$ne : userId}}})


       return res.status(200).json(acceptUsers);

    }catch(error){
        return res.status(500).json({error : "friendList error"})
    }
}

exports.friendRequests = async (req , res) => {
    try{
       const interestedUsers = await Request.find(
        {action : "Interested" ,
         to : req.user.id
        }
    )
      
       const requestId = await interestedUsers.map( request => request.from);

       const requests = await userModel.find({ _id : {$in : requestId} })

       return res.status(200).json(requests);
    }catch(error){
        return res.status(500).json({error : "friendRequest error"})
    }
}