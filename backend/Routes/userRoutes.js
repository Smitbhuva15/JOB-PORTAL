const express=require('express');

const { login, updateProfile,  signup, forgotPasswordSendOtp, forgotPasswordResendOtp, forgotPasswordVerifyOtp, forgotPasswordUpdate } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authmiddleware');
const { singleUpload } = require('../middlewares/multer');
const { userdata } = require('../controllers/userData');


const userroutes=express.Router();


userroutes.post('/signup',singleUpload,signup)
userroutes.post('/login',login)
userroutes.patch('/update/profile',singleUpload,authMiddleware,updateProfile)
userroutes.get('/get/userdata',authMiddleware,userdata)
userroutes.post('/forgot-password/send-otp', forgotPasswordSendOtp)
userroutes.post('/forgot-password/resend-otp', forgotPasswordResendOtp)
userroutes.post('/forgot-password/verify-otp', forgotPasswordVerifyOtp)
userroutes.post('/forgot-password/update-password', forgotPasswordUpdate)

exports.userroutes=userroutes;