const express=require('express');
const { applyJob, getApplication, updatestatus } = require('../controllers/aplicationController');

const applicationRoutes=express.Router();

applicationRoutes.post('/apply/job/:id',applyJob)
applicationRoutes.get('/get/application/me',getApplication)
applicationRoutes.patch('/update/status/:id',updatestatus)





exports.applicationRoutes=applicationRoutes