const express=require('express');
const { applyJob,  updatestatus, getAppliedJobs, getApplication } = require('../controllers/aplicationController');
const { authMiddleware } = require('../middlewares/authmiddleware');

const applicationRoutes=express.Router();

applicationRoutes.post('/apply/job/:id',authMiddleware,applyJob)
applicationRoutes.get('/get/application/me',authMiddleware,getAppliedJobs)
applicationRoutes.patch('/update/status/:id',updatestatus)
applicationRoutes.get('/get/appication/admin/:id',authMiddleware,getApplication)






exports.applicationRoutes=applicationRoutes