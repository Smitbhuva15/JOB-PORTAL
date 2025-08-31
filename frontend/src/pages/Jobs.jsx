import { useDispatch, useSelector } from 'react-redux'
import FilterItem from './jobs/FilterItem'
import Job from './jobs/Job'
import React, { useEffect, useState } from 'react'
import GetAllJobs from '../FechingData/GetAllJobs'
import { useNavigate } from 'react-router-dom'
import Category from './Home/Category'
import { Loader2 } from 'lucide-react'

const Jobs = () => {

  const searchdata = useSelector(store => store.job.searchdata)
  const alljobs = useSelector(store => store.job.Alljobs)
  const searchjobdata = useSelector(store => store.job.searchjobdata)

  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState(alljobs);
  // protect the routes
  const [token1, setToken1] = useState(localStorage.getItem('token-jobportal'));

  const dispatch = useDispatch();
  const navigate = useNavigate()



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
            isLoading ? (
              <div className="flex justify-center items-center w-full min-h-[50vh]">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              </div>
            ) : (

              filterData.length <= 0 ? (
                <div className="flex justify-center items-center w-full min-h-[50vh] ">
                  <div className='text-red-500 text-center lg:text-lg text-sm font-bold  italic sm:bg-gray-100 sm:rounded-full sm:px-6 sm:py-2'>
                    Looks like we don’t have jobs for your preferences at the moment.
                  </div>

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

            )
          }

        </div>
      </div>
    </>
  )
}

export default Jobs

