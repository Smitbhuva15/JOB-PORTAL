import { useSelector } from 'react-redux'
import FilterItem from './jobs/FilterItem'
import Job from './jobs/Job'
import React, { useEffect, useState } from 'react'
import GetAllJobs from '../FechingData/GetAllJobs'
import { useNavigate } from 'react-router-dom'

const Jobs = () => {

  GetAllJobs()

   const alljobs = useSelector(store => store.job.Alljobs)

   const [filterData, setFilterData] = useState(alljobs);
   const searchjobdata = useSelector(store => store.job.searchjobdata)
    
  const navigate=useNavigate()


    // protect the routes
    const [token1, setToken1] = useState(localStorage.getItem('token-jobportal'));
        
          useEffect(() => {
            if (!token1) {
              navigate('/login')
            }
            
        
          }, []);
    

   useEffect(() => {

    if(searchjobdata){
      const filtered=alljobs.filter((job)=>{
        return job?.title.toLowerCase().includes(searchjobdata.toLowerCase())||
        job?.description.toLowerCase().includes(searchjobdata.toLowerCase())||
        job?.location.toLowerCase().includes(searchjobdata.toLowerCase())
      })
      setFilterData(filtered)
     }
     else{
      setFilterData( alljobs)
     }
   
   }, [alljobs,searchjobdata]);
   


  return (
    <>
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterItem />
          </div>

          {
            filterData.length <= 0 ? <span span className="flex  text-[#ef303d] text-2xl font-bold h-[88vh] mb-24">No Jobs Available, for Your Requirement!!</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                  (filterData.map((job)=>(<Job key={job._id} job={job}/>)))
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

