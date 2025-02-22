import { useSelector } from 'react-redux'
import FilterItem from './jobs/FilterItem'
import Job from './jobs/Job'
import React, { useEffect, useState } from 'react'
import GetAllJobs from '../FechingData/GetAllJobs'
import { useNavigate } from 'react-router-dom'
import Category from './Home/Category'
import { Loader2 } from 'lucide-react'

const Jobs = () => {

  GetAllJobs()

  const alljobs = useSelector(store => store.job.Alljobs)

  const [filterData, setFilterData] = useState(alljobs);
  const searchjobdata = useSelector(store => store.job.searchjobdata)

  const navigate = useNavigate()


  // protect the routes
  const [token1, setToken1] = useState(localStorage.getItem('token-jobportal'));

  useEffect(() => {
    if (!token1) {
      navigate('/login')
    }


  }, []);


  useEffect(() => {

    if (searchjobdata) {
      const filtered = alljobs.filter((job) => {
        return job?.title.toLowerCase().includes(searchjobdata.toLowerCase()) ||
          job?.description.toLowerCase().includes(searchjobdata.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchjobdata.toLowerCase())
      })
      setFilterData(filtered)
    }
    else {
      setFilterData(alljobs)
    }

  }, [alljobs, searchjobdata]);

  console.log(filterData, "filter")

  return (
    <>
      <div className=' sm:max-w-screen-sm md:max-w-2xl mx-auto my-14 xl:max-w-7xl lg:max-w-5xl w-[90%]'>

        <div className='mb-5 md:hidden block '>
          <Category />
        </div>

        <div className='flex gap-5'>
          <div className='w-20% md:block hidden'>
            <FilterItem />
          </div>
          {
            filterData.length <= 0 ? (
              <div className="flex justify-center items-center w-full min-h-[50vh]">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              </div>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {filterData.map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
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

