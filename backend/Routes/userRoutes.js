const express=require('express');

const { login, updateProfile,  signup } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authmiddleware');
const { singleUpload } = require('../middlewares/multer');
const { userdata } = require('../controllers/userData');


const userroutes=express.Router();


userroutes.post('/signup',singleUpload,signup)
userroutes.post('/login',login)
userroutes.patch('/update/profile',singleUpload,authMiddleware,updateProfile)
userroutes.get('/get/userdata',authMiddleware,userdata)




exports.userroutes=userroutes;