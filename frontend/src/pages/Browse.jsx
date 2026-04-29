import { useDispatch, useSelector } from 'react-redux'
import GetAllJobs from '../FechingData/GetAllJobs'
import Job from './jobs/Job'
import React, { useContext, useEffect, useState } from 'react'
import { setsearchjob } from '@/store/jobSlice'
import { AuthContext } from '@/Context-Api/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  // protect the routes
  const [token1, setToken1] = useState(localStorage.getItem('token-jobportal'));

  const Alljobs = useSelector(store => store.job.Alljobs)
  const searchdata = useSelector(store => store.job.searchdata)

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getjobs = async () => {
      try {
        setIsLoading(true);
        await GetAllJobs(token, dispatch, searchdata, API_URL);
      } catch (error) {
        console.log(error)
      }
      finally {
        setIsLoading(false);
      }
    }

    getjobs();
  }, [])

  useEffect(() => {
    dispatch(setsearchjob(""))
  }, []);

  useEffect(() => {
    if (!token1) {
      navigate('/login')
    }

  }, []);




  return (
    <div className='bg-background min-h-[calc(100vh-8rem)] py-8'>
      <div className='sm:max-w-screen-sm md:max-w-2xl xl:max-w-7xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className="mb-8">
          <h1 className="font-bold text-3xl font-heading text-foreground">
            Browse Jobs
          </h1>
          <p className="text-muted-foreground mt-2">
            {!isLoading && `Found ${Alljobs?.length || 0} open positions`}
          </p>
        </div>

        {
          isLoading ? (
            <div className="flex justify-center items-center w-full min-h-[50vh]">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : (
            Alljobs.length <= 0 ? (
              <div className="flex flex-col justify-center items-center w-full min-h-[40vh] bg-card border border-border rounded-2xl shadow-sm">
                <div className='text-muted-foreground text-center text-lg font-medium'>
                  No jobs available right now.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
                {Alljobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )
          )
        }
      </div>
    </div>
  )
}



export default Browse


