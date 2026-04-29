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
    <div className='bg-background min-h-[calc(100vh-8rem)] py-8'>
      <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto xl:max-w-7xl lg:max-w-5xl px-4 sm:px-6 lg:px-8 w-full'>
        
        {/* Mobile Header & Filter Toggle */}
        <div className="flex md:hidden items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-heading text-foreground">Find Jobs</h1>
          <button 
            onClick={() => document.getElementById('mobile-filter').classList.toggle('hidden')}
            className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium"
          >
            Filters
          </button>
        </div>

        {/* Mobile Filter Drawer (Simple implementation) */}
        <div id="mobile-filter" className="hidden md:hidden mb-6 animate-in slide-in-from-top-4">
          <FilterItem />
        </div>

        <div className='flex gap-8'>
          {/* Desktop Sidebar */}
          <div className='hidden md:block w-1/4 shrink-0'>
            <div className="sticky top-24">
              <FilterItem />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search Bar Area */}
            <div className="mb-6 bg-card border border-border p-2 rounded-xl shadow-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-muted-foreground ml-2 h-5 w-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input 
                type="text" 
                placeholder="Search by job title, description, or location..."
                className="w-full bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground px-2 py-2"
                value={searchjobdata}
                onChange={(e) => dispatch({ type: 'job/setsearchjob', payload: e.target.value })}
              />
            </div>

            {
              isLoading ? (
                <div className="flex justify-center items-center w-full min-h-[50vh]">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
              ) : (
                filterData.length <= 0 ? (
                  <div className="flex flex-col justify-center items-center w-full min-h-[40vh] bg-card border border-border rounded-2xl shadow-sm">
                    <div className='text-muted-foreground text-center text-lg font-medium'>
                      No jobs match your current filters.
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or clearing filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pb-10">
                    {filterData.map((job) => (
                      <Job key={job._id} job={job} />
                    ))}
                  </div>
                )
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs

