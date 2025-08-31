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
    <div>
      <div className='sm:max-w-screen-sm md:max-w-2xl xl:max-w-7xl lg:max-w-5xl mx-auto my-10 w-[90%]'>
        <h1 className="font-bold text-xl mt-8">
          Search Results{" "}
          {isLoading ? (
            <span className="text-gray-400"></span>
          ) : (
            Alljobs?.length || 0
          )}
        </h1>

        {
          isLoading ? (
            <div className="flex justify-center items-center w-full h-[70vh]">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
          ) : (

            Alljobs.length <= 0 ? (
              <div className="flex justify-center items-center w-full h-[70vh] ">
                <div className='text-red-500 text-center lg:text-lg text-sm font-bold  italic sm:bg-gray-100 sm:rounded-full sm:px-6 sm:py-2'>
                  Looks like we don’t have jobs for your preferences at the moment.
                </div>

              </div>
            ) : (
              <div className={` grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${Alljobs.length <= 3 ? 'mb-80' : 'mb-0'} mt-10`}>
                {Alljobs.map((job) =>
                (
                  <Job job={job} />
                ))
                }
              </div>
            )

          )
        }

      </div>
    </div>
  )
}



export default Browse


