const mongooes = require('mongoose');
const validator = require('validator');

const companySchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Title must be at least 3 characters long!!"]
    },
    description: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String // URL to company logo
    },
    userId: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{timestamps:true})

exports.companyModel=mongooes.model("Company",companySchema)