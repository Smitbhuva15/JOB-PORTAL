import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Bookmark } from 'lucide-react';
import { Badge } from '../../components/ui/badge'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Job = () => {
  const jobid='dgfdgdfgdf312'
  const navigate=useNavigate();
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      {/* Job Posting Metadata */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p> {/* Displaying the time the job was posted */}
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          aria-label="Bookmark this job"
        >
          <Bookmark />
        </Button>
      </div>

      {/* Job and Company Details */}
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn" 
            />
            <AvatarFallback>SC</AvatarFallback> 
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg " >Company Name</h1> 
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
                <h1 className='font-bold text-lg my-2'>job?.title</h1>
                <p className='text-sm text-gray-600'>job?.description</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-[#020ef8] font-bold'} variant="ghost">job-position Positions</Badge>
                <Badge className={'text-[#2bd53f] font-bold'} variant="ghost">job.jobType</Badge>
                <Badge className={'text-[#a909b7] font-bold'} variant="ghost">job?.salar</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
              <div onClick={()=>navigate(`/jobs/Detail/${jobid}`)}> <Button variant="outline "  >Details</Button></div>
               
                <Button className="bg-[#020ef8]">Save For Later</Button>
            </div>
    </div>
  );
};

export default Job;