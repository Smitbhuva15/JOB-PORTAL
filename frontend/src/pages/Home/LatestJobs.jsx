import React, { useContext, useEffect, useState } from 'react'
import Job from '../jobs/Job';
import GetAllJobs from '../../FechingData/GetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '@/Context-Api/AuthContext';

const LatestJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));

  const dispatch = useDispatch();

  const API_URL = import.meta.env.VITE_API_URL;
  const { userData, loading } = useContext(AuthContext);
  const searchdata = useSelector(store => store.job.searchdata)
  const alljobs = useSelector(store => store.job.Alljobs)

  useEffect(() => {
    const getjob = async () => {
      try {
        setIsLoading(true)
        await GetAllJobs(token, dispatch, searchdata, API_URL);
      } catch (error) {
        console.log("error: ", error)
      }
      finally {
        setIsLoading(false);
      }
    }
    getjob();
  }, [])

  return (
    <div className='bg-muted/10 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            <span className='text-primary'>Fresh & In-Demand </span> Job Opportunities
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore the latest roles matched for your skills.
          </p>
        </div>

        {
          loading ? (
            <div className='flex justify-center items-center h-[30vh]'>
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : (
            userData && Object.keys(userData).length > 0 ? (
              isLoading ? (
                <div className='flex justify-center items-center h-[30vh]'>
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
              ) : alljobs && alljobs.length > 0 ? (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {alljobs.slice(0, 8).map((job) => (
                    <div key={job._id} className="h-full">
                      <Job job={job} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center w-full min-h-[40vh] bg-card border border-border rounded-2xl shadow-sm">
                  <div className='text-muted-foreground text-center text-lg font-medium'>
                    Currently no job openings.
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Check back later for fresh updates!</p>
                </div>
              )
            ) : (
              <div className="flex flex-col justify-center items-center w-full min-h-[30vh] bg-card border border-border rounded-2xl shadow-sm max-w-2xl mx-auto">
                <div className='text-muted-foreground text-center text-lg font-medium mb-4'>
                  Unlock your next career move
                </div>
                <span className="text-primary font-medium bg-primary/10 rounded-full px-6 py-2 text-sm text-center">
                  Please log in to view job opportunities.
                </span>
              </div>
            )
          )
        }
      </div>
    </div>
  );
}

export default LatestJobs
