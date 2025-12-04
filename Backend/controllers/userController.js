const userModel = require('../models/userModel');

exports.userProfile = async (req , res) => {
    try{
        console.log("user" , req.user.id);
       const user = await userModel.findById(req.user.id);
       if(!user) return res.status(404).json({error : 'user not found'})
       
       return res.status(201).json([user])
     
    }catch(error){
       console.log("profile error" , error);
       return res.status(500).json({error : 'profile not found' })
    }
}

exports.userProfileEdit = async (req , res) => {
     const updateData = {};
   
     if(req.body.name){
        updateData.name = req.body.name;
     }
     if(req.body.email){
        updateData.email = req.body.email;
     }
     if(req.body.profession){
        updateData.profession = req.body.profession;
     }
     if(req.body.skills){
        updateData.skills = req.body.skills;
     }
     if(req.body.bio){
        updateData.bio = req.body.bio;
     }
     
    try{
        console.log("updateData" , updateData)
         console.log("req " , req.user.id)
        const edit = await userModel.findByIdAndUpdate(
            req.user.id,
            updateData,
            {new: true , runValidators : true}
        )

        if(!edit){
            return res.status(404).json({error : 'User not found'})
        }
         
        return res.status(201).json(edit);

    }catch(error){
         console.log("user Profile edit error" , error);
         return res.status(500).json({error});
    }
}
