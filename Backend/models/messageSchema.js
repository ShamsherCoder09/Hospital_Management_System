import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3, "First Name Must Contains At Least 3 Characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3, "Last Name Must Contains At Least 3 Characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail , "Please Provide Valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number Must Be Contain Exact 10 Digit" ],
        maxLength:[10,"Phone Number Must Be Contain Exact 10 Digit" ]
    },
    message:{
        type:String,
        required:true,
        minLength:[10 , "Message Must Contains At Least 10 Character"]
    }
},{
    timestamps:true,
});

export const Message = mongoose.model("Message", messageSchema);