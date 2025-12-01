const Request = require("../models/IntractionModel");
const userModel = require("../models/userModel");

exports.friendList = async (req , res) => {
    try{
       const acceptUsers = await Request.find(
        {action : "Accept",
         to : req.user.id   
        });

       const friendId = await acceptUsers.map( friend => friend.from);

       const friendPost = await userModel.find({_id : {$in : friendId}})

       return res.status(200).json(friendPost);

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