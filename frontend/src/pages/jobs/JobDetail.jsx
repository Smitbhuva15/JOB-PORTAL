import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '@/Context-Api/AuthContext'
import { toast } from 'react-toastify'

const JobDetail = () => {
    const params = useParams();
    const jobId = params.id;

    const { token } = useContext(AuthContext);
    const [singleJobData, setSingleJobData] = useState({});
    const {userData}=useContext(AuthContext)

    const isApplied = singleJobData?.applications?.some(application=>application.applicant===userData?._id) ||false;
    const value=1

    const applyJob=async()=>{
        try {
            const response =await fetch(`http://localhost:5000/user/v2/api/apply/job/${jobId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
           

            if (response.ok) {
                const data = await response.json();
              
                setSingleJobData(prevState => ({
                    ...prevState,
                    applications: [...prevState.applications, userData._id] 
                }));
                toast.success(data.message)

            } else {
                const errorMessage = await response.json();
            

                toast.info(errorMessage.message)
               
            }

        } catch (error) {
            console.log(error)
        }
          
    }


    const fechingsingleJobData = async () => {
        try {
            const response =await fetch(`http://localhost:5000/user/v2/api/get/jobbyid/${jobId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
           

            if (response.ok) {
                const data = await response.json();
                // console.log(data.job)
                setSingleJobData(data.job)

            } else {
                const errorMessage = await response.json();
                console.log(errorMessage)
            }

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fechingsingleJobData();
       
  }, [ jobId]); 


    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJobData?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-[#020ef8] font-bold'} variant="ghost">{singleJobData?.postion} Positions</Badge>
                        <Badge className={'text-[#2bd53f] font-bold'} variant="ghost">{singleJobData?.jobType}</Badge>
                        <Badge className={'text-[#a909b7] font-bold'} variant="ghost">{singleJobData?.salary} LPA</Badge>
                    </div>
                </div >
                <Button
                onClick={()=>{
                    applyJob()
                }}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#020ef8] hover:bg-[#181b5c]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4' >
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.title}</span> </h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.experienceLevel
                } yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDetail