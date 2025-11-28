const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
    index: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  Connections :{
    type :[mongoose.Schema.Types.ObjectId],
    default:[]
  },
  Ignore : {
    type : [mongoose.Schema.Types.ObjectId],
    default:[]
  },
  bio: String,
  //   profileImg: String,
});

module.exports = mongoose.model( 'userModel' , userSchema);
