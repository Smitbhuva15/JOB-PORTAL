import React, { useContext } from 'react'
import LatestJobCrad from './LatestJobCrad';
import GetAllJobs from '../../FechingData/GetAllJobs';
import { useSelector } from 'react-redux';
import store from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '@/Context-Api/AuthContext';

const LatestJobs = () => {

  GetAllJobs()
  const navigate = useNavigate()

  const alljobs = useSelector(store => store.job.Alljobs)
  const { userData } = useContext(AuthContext);



  return (

    <>
      <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto my-20 xl:max-w-7xl lg:max-w-5xl w-[90%] '>
        <h1 className='md:text-4xl text-2xl font-bold sm:ml-0 w-[90%'>
          <span className='text-[#020ef8]'>Latest & Top </span> Job Openings
        </h1>
        <div className='grid grid-cols-1 gap-4 my-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
          {
            !userData || Object.keys(userData).length === 0 ?
              (
                <span className="text-red-500 font-light text-lg font-serif">Currently, there are no job postings. Please log in or check back later.</span>

              )
              : (
                alljobs.length <= 0 ? (
               
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              
                ) : (
                  alljobs.map((job) => (
                    <div key={job._id} onClick={() => navigate(`/jobs/Detail/${job._id}`)}>
                      <LatestJobCrad job={job} />
                    </div>
                  ))
                )
              )

          }
        </div>
      </div>

    </>
  )
}

export default LatestJobs


