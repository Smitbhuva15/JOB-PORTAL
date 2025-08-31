import React, { useContext, useEffect, useState } from 'react'
import LatestJobCrad from './LatestJobCrad';
import GetAllJobs from '../../FechingData/GetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '@/Context-Api/AuthContext';

const LatestJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));

  const dispatch = useDispatch();
  const navigate = useNavigate()

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
    <>
      <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto my-20 xl:max-w-7xl lg:max-w-5xl w-[90%] '>
        <h1 className='md:text-4xl text-2xl font-bold sm:ml-0 w-[90%]'>
          <span className='text-[#020ef8]'>Fresh & In-Demand  </span> Job Opportunities
        </h1>
        {
          loading ? (
            <div className='flex justify-center items-center h-[30vh]'>
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin " />
            </div>
          ) : (
            userData && Object.keys(userData).length > 0 ? (


              isLoading ? (
                <div className='flex justify-center items-center h-[30vh]'>
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin " />
                </div>
              ) : alljobs && alljobs.length > 0 ? (
                <div className='grid grid-cols-1 gap-4 my-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                  {alljobs.map((job) => (
                    <div key={job._id} onClick={() => navigate(`/jobs/Detail/${job._id}`)}>
                      <LatestJobCrad job={job} />
                    </div>
                  ))}
                </div>

              ) : (
                <div className='text-center my-20 text-wrap'>
                  <span className="text-gray-400 md:text-xl text-sm italic sm:bg-gray-100 sm:rounded-full sm:px-4 sm:py-2">
                    Currently no job openings. Check back later for fresh updates!
                  </span>
                </div>
              )


            ) : (
              <div className=' my-20  text-center text-wrap'>
                <span className="text-red-500 font-medium md:text-xl italic bg-gray-100 rounded-full px-4 py-2  text-sm text-center">
                  Please log in to view job opportunities.
                </span>
              </div>
            )
          )
        }
      </div>
    </>

  );

}

export default LatestJobs


//  !userData || Object.keys(userData).length === 0 ?
//               (
//                 <span className="text-red-500 font-light text-lg font-serif">Currently, there are no job postings. Please log in or check back later.</span>

//               )
//               : (
//                 alljobs.length <= 0 ? (

//                   <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />

//                 ) : (
//                   alljobs.map((job) => (
//                     <div key={job._id} onClick={() => navigate(`/jobs/Detail/${job._id}`)}>
//                       <LatestJobCrad job={job} />
//                     </div>
//                   ))
//                 )
//               )