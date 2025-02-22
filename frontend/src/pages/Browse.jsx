import { useDispatch, useSelector } from 'react-redux'
import GetAllJobs from '../FechingData/GetAllJobs'
import Job from './jobs/Job'
import React, { useContext, useEffect, useState } from 'react'
import { setsearchjob } from '@/store/jobSlice'
import { AuthContext } from '@/Context-Api/AuthContext'
import { useNavigate } from 'react-router-dom'

const Browse = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  GetAllJobs()
  const Alljobs = useSelector(store => store.job.Alljobs)

 
  useEffect(() => {
   
    dispatch(setsearchjob(""))
   
  }, []);
 
  // protect the routes
   const [token1, setToken1] = useState(localStorage.getItem('token-jobportal'));
    
      useEffect(() => {
        if (!token1) {
          navigate('/login')
        }
 
      }, []);
 
  


  return (
    <div>
      <div className='sm:max-w-screen-sm md:max-w-2xl xl:max-w-7xl lg:max-w-5xl mx-auto my-10 w-[90%]'>
        <h1 className={`font-bold text-xl  mt-8`}  >Search Results {Alljobs.length}</h1>

        {
          Alljobs.length <= 0
            ?
            (<div className='mb-40 mt-6'><span className='text-red-500 font-light text-lg font-serif '>Currently, there are no jobs aligned with your preferences!!
            </span></div>)
            :
            (
              <div className={` grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${Alljobs.length <= 3 ? 'mb-80' : 'mb-0'} mt-10`}>
                {Alljobs.map((job) =>
                (
                  <Job job={job} />
                )
                )
                }
              </div>
            )
        }

      </div>
    </div>
  )
}



export default Browse