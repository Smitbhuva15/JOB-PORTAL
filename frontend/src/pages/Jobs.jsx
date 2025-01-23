import { useSelector } from 'react-redux'
import FilterItem from './jobs/FilterItem'
import Job from './jobs/Job'
import React from 'react'
import GetAllJobs from '../FechingData/GetAllJobs'

const Jobs = () => {

  GetAllJobs()

   const alljobs = useSelector(store => store.job.Alljobs)


  return (
    <>
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterItem />
          </div>

          {
            alljobs.length <= 0 ? <span className='mb-96 text-[#ef303d] text-4xl font-mono '>No Jobs Available, please Login in First!!</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                  (alljobs.map((job)=>(<Job key={job._id} job={job}/>)))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Jobs

