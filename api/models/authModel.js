import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
  email :{
    type: String,
    required: true,
    unique: true,
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  role:{
    type: String,
    required: true,
    default: "user",
  },
  profileImage:{
    type: String,
    required: true,
  },
  
},{timestamp: true})