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
      <div className='flex justify-center items-center h-[90vh] bg-background'>
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    ) : (
      <div className='mx-auto max-w-7xl px-4 md:px-8 py-12'>
        <div className="flex flex-col gap-2 mb-8">
          <h1 className='font-bold text-3xl font-heading text-foreground'>
            Applications
          </h1>
          <p className="text-muted-foreground">
            Reviewing {applicants?.applications?.length || 0} candidate{applicants?.applications?.length !== 1 && 's'} for this role.
          </p>
        </div>
        <ApplicantsTable />
      </div>
    )
  )
}

export default AdminApplicaton