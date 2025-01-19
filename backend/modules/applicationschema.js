const mongooes = require('mongoose');
const validator = require('validator');

const applicationschema=new mongooes.Schema({
    job:{
            type:mongooes.Schema.Types.ObjectId,
            ref:'Job',
            required:true
        },
        applicant:{
            type:mongooes.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        status:{
            type:String,
            enum:['pending', 'accepted', 'rejected'],
            default:'pending'
        }
},{timestamps:true})

exports.applicationModel=mongooes.model("Application",applicationschema);