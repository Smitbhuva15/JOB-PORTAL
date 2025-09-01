import GetApplicant from '../../FechingData/GetApplicant';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ApplicantsTable from './ApplicantsTable';
import { Loader2 } from 'lucide-react';

const AdminApplicaton = () => {
  const params = useParams()
  const dispatch = useDispatch();

  const API_URL = import.meta.env.VITE_API_URL;
  const jobId = params.id;
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  const [isLoading, setIsLoading] = useState(true);

  const applicants = useSelector(store => store.application.applicantJobs)


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


  return (
    isLoading ? (
      <div className='flex justify-center items-center h-[90vh]'>
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin " />
      </div>
    ) : (
      <div className='mx-auto sm:max-w-screen-sm md:max-w-2xl  my-14 xl:max-w-7xl lg:max-w-5xl w-[90%]'>
        <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length} </h1>
        <ApplicantsTable />
      </div>
    )

  )
}

export default AdminApplicaton