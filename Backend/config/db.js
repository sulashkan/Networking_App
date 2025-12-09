const mongoose = require("mongoose");
require("dotenv").config();

 const connectDB = async () => {
    try{
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Database Connect Succesfull")
    }catch(error){
        throw new Error(error);
    }
}

module.exports = connectDB;



