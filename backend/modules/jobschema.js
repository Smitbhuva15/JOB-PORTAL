const mongooes=require('mongoose');
const validator = require('validator');

const jobSchema=new mongooes.Schema({

     title: {
            type: String,
            required: true,
            minlength: [3, "Title must be at least 3 characters long!!"]
        },
        description: {
            type: String,
            required: true,
            minlength: [10, "description must be at least 3 characters long!!"]
        },
        requirements: [{
            type: String
        }],
        salary: {
            type: Number,
            required: true
        },
        experienceLevel:{
            type:Number,
            required:true,
        },
        location: {
            type: String,
            required: true
        },
        jobType: {
            type: String,
            required: true
        },
        position: {
            type: Number,
            required: true
        },
        company: {
            type: mongooes.Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },
        created_by: {
            type: mongooes.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        applications: [
            {
                type: mongooes.Schema.Types.ObjectId,
                ref: 'Application',
            }
        ]
        
},{timestamps:true})

exports.jobModel=mongooes.model("Job",jobSchema)