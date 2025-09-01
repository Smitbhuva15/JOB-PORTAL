import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '@/Context-Api/AuthContext'

import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import GetApplicant from '@/FechingData/GetApplicant'

const JobDetail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    const API_URL = import.meta.env.VITE_API_URL;
    const [applied, setApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useContext(AuthContext);
    const [singleJobData, setSingleJobData] = useState({});
    const { userData } = useContext(AuthContext)

    const applicants = useSelector(store => store?.application?.applicantJobs)

    const isApplied = applied || applicants?.applications?.some(application => application?.applicant?._id === userData?._id) || false;
    const value = 1
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getApplicant = async () => {
            try {
                setIsLoading(true);
                await GetApplicant(jobId, token, dispatch, API_URL);
            } catch (error) {
                console.log("error: ", error)
            }
            finally {
                setIsLoading(false);
            }
        }
        getApplicant();
    }, [])


    const applyJob = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/user/v2/api/apply/job/${jobId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })


            if (response.ok) {
                const data = await response.json();
                setApplied(true)
                toast.success(data.message)

            } else {
                const errorMessage = await response.json();
                toast(errorMessage.message);

            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }


    const fechingsingleJobData = async () => {
        try {
            const response = await fetch(`${API_URL}/user/v2/api/get/jobbyid/${jobId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })


            if (response.ok) {
                const data = await response.json();
                setSingleJobData(data.job)

            } else {
                const errorMessage = await response.json();
            }

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fechingsingleJobData();
    }, [jobId]);

    return (
        singleJobData === null || Object.keys(singleJobData).length === 0 ? (
            <div className="flex justify-center items-center w-full min-h-[50vh]">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        )
            :
            (
                <div className='sm:max-w-screen-sm md:max-w-2xl xl:max-w-7xl lg:max-w-5xl w-[90%] mx-auto my-10'>
                    <div className='flex flex-col sm:flex-row items-center justify-between'>
                        <div>
                            <h1 className='font-bold text-xl '>{singleJobData?.title}</h1>
                            <div className='flex items-center gap-2 mt-4'>
                                <Badge className={'text-[#020ef8] font-bold'} variant="ghost">{singleJobData?.postion} Positions</Badge>
                                <Badge className={'text-[#2bd53f] font-bold'} variant="ghost">{singleJobData?.jobType}</Badge>
                                <Badge className={'text-[#a909b7] font-bold'} variant="ghost">{singleJobData?.salary} LPA</Badge>
                            </div>
                        </div >
                        {
                            loading ?
                                (
                                    <Button className="rounded-lg sm:mt-0 mt-5"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                                )

                                :
                                (
                                    isLoading ?(<></>):
                                   ( <Button
                                        onClick={() => {
                                            applyJob()
                                        }}
                                        disabled={isApplied}
                                        className={`rounded-lg sm:mt-0 mt-5 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#020ef8] hover:bg-[#262c9a]'}`}>
                                        {isApplied ? 'Submitted' : 'Apply Now'}
                                    </Button>
)
                                )
                        }

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
    )
}

export default JobDetail

