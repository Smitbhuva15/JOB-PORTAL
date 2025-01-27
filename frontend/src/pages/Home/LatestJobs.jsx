import React from 'react'
import LatestJobCrad from './LatestJobCrad';
import GetAllJobs from '../../FechingData/GetAllJobs';
import { useSelector } from 'react-redux';
import store from '../../store/store';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {

  GetAllJobs()


  const alljobs = useSelector(store => store.job.Alljobs)
  // console.log(alljobs); 
 const navigate=useNavigate()
  return (

    <>
    <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto my-20 xl:max-w-7xl lg:max-w-5xl w-[90%] '>
  <h1 className='md:text-4xl text-2xl font-bold sm:ml-0 w-[90%'>
    <span className='text-[#020ef8]'>Latest & Top </span> Job Openings
  </h1>
  <div className='grid grid-cols-1 gap-4 my-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
    {
      alljobs.length <= 0 ? (
        <span className='text-[#f43838]'>No Jobs Available, please Login First!</span>
      ) : (
        alljobs.map((job) => (
          <div key={job._id} onClick={() => navigate(`/jobs/Detail/${job._id}`)}>
            <LatestJobCrad job={job} />
          </div>
        ))
      )
    }
  </div>
</div>

    </>
  )
}

export default LatestJobs