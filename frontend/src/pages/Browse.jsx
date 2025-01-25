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
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className={`font-bold text-xl  mt-8`}  >Search Results {Alljobs.length}</h1>

        {
          Alljobs.length <= 0
            ?
            (<div className='mb-40 mt-6'><span className='text-red-600 font-bold text-2xl '>Jobs Are Not Avaliable Related To Your Intrest!!
            </span></div>)
            :
            (
              <div className={`grid grid-cols-3 gap-4 ${Alljobs.length <= 3 ? 'mb-80' : 'mb-0'} mt-10`}>
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