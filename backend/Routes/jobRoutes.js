const express=require('express');
const { postjob, getAllJobs, getjobById, getAdminjobs, updateJob } = require('../controllers/jobController');
const { authMiddleware } = require('../middlewares/authmiddleware');

const jobroutes=express.Router();

jobroutes.post('/post/job',authMiddleware,postjob)
jobroutes.get('/get/alljob',authMiddleware,getAllJobs)
jobroutes.get('/get/jobbyid/:id',authMiddleware,getjobById)
jobroutes.get('/admin/create/job',authMiddleware,getAdminjobs)
jobroutes.patch('/admin/update/job/:id',authMiddleware,updateJob)




exports.jobroutes=jobroutes

