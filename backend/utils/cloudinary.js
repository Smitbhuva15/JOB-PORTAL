const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLODINARY_NAME, 
    api_key: process.env.CLODINARY_KEY, 
    api_secret: process.env.CLODINARY_SECRET
  });

  exports.cloudinary=cloudinary;