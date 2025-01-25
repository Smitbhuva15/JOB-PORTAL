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
      <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#020ef8]'>Latest & Top </span> Job Openings</h1>
        <div className='grid grid-cols-3 gap-4 my-5'>
          {
            alljobs.length<=0?(<span className='text-[#f43838]'>No Jobs Available, please Login in First!!</span>):(alljobs.map((job)=>(<div onClick={()=>{navigate(`/jobs/Detail/${job._id}`)}}><LatestJobCrad key={job._id} job={job}/></div>)))
          }
        </div>

      </div>
    </>
  )
}

export default LatestJobs