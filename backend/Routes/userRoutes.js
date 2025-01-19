const express=require('express');

const { login, updateProfile,  signup } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authmiddleware');

const userroutes=express.Router();


userroutes.post('/signup',signup)
userroutes.post('/login',login)
userroutes.patch('/update/profile',authMiddleware,updateProfile)




exports.userroutes=userroutes;