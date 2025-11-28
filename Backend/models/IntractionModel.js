const mongoose = require("mongoose");
const userModel = require("./userModel")

const requestSchema = mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required : true
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    action : {
        type : String,
        enum : [ "Pending" , "Interested", "Ignore" , "Accept" , "Reject"],
        required: true
    }
})

module.exports = mongoose.model("Request" , requestSchema)