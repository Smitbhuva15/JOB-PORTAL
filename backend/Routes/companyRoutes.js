
const express=require('express');
const { registercompany, getcompany, getcompanybyId, updatecompany } = require('../controllers/companyController');
const { authMiddleware } = require('../middlewares/authmiddleware');
const { singleUpload } = require('../middlewares/multer');
const companyroutes=express.Router();



companyroutes.post('/register/company',authMiddleware,registercompany)
companyroutes.get('/get/company',authMiddleware,getcompany)
companyroutes.get('/get/companybyid/:id',authMiddleware,getcompanybyId)
companyroutes.patch('/update/company/:id',singleUpload,authMiddleware,updatecompany)

exports.companyroutes=companyroutes