import mongoose, { Mongoose } from "mongoose";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

const userSchema = new mongoose.Schema({
    auth0Id:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,

    },
    addressLine1:{
        type:String
    },
    city:{
        type:String
    },
    phoneNumber: {
        type: String,
        match: phoneNumberRegex,
        
    }
});

const User = mongoose.model("User",userSchema);
export default User;