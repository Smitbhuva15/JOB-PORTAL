const mongoose = require('mongoose'); 

const validator = require('validator');


const userSchema=new mongoose.Schema({
        fullname: {
            type: String,
            required: true,
            minlength: [3, "Full name must be at least 3 characters long!!"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email address!!"]
        },
        phoneNumber: {
            type: Number,
            required: true,
            validate: {
                validator: function(v) {
                    return /\d{10}/.test(v);   //  10 digit phone number validation
                },
                message: props => `${props.value} is not a valid phone number!!`
            }
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['student','recruiter'],
            required:true
        },
        profile:{
            bio:{type:String},
            skills:[{type:String}],
            resume:{type:String}, 
            resumeOriginalName:{type:String},
            company:{
                type:mongoose.Schema.Types.ObjectId,
                 ref:'Company'
                }, 
            profilePhoto:{
                type:String,
                default:""
            }
        },
},{timestamps:true})

exports.userModel=mongoose.model("User",userSchema)