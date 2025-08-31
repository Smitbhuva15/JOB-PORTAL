import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  const navigate = useNavigate();
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };
  return (
   
    <motion.div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 "
      initial="hidden"
      animate="visible"
      variants={boxVariants}
      transition={{ duration: 1 }}
    >

      <div className="flex items-center justify-between">
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
       
      </div>

      {/* Job and Company Details */}
      <div className="flex items-center gap-2 my-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              alt="@shadcn"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg  truncate" >{job?.company?.name}</h1>
          <p className="text-sm text-gray-500  truncate">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2  truncate'>{job?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-[#020ef8] font-bold'} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={'text-[#2bd53f] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#a909b7] font-bold'} variant="ghost">{job?.salary}</Badge>
      </div>
      <div className=' mt-4 w-full bg-[#252ff2]   rounded-full text-center text-white'>
        <div onClick={() => navigate(`/jobs/Detail/${job._id}`)}> <Button variant="outline " className="py-4"  >Details</Button></div>

      
      </div>
    </motion.div>
    
  );
};

export default Job;