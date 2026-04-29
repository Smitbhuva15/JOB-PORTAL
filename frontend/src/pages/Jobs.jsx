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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchjobdata || '');
  
  // protect the routes
  const [token1, setToken1] = useState(localStorage.getItem('token-jobportal'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch({ type: 'job/setsearchjob', payload: searchTerm });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

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
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filters
          </button>
        </div>

        {/* Mobile Filter Drawer (Slide-in) */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative ml-auto w-4/5 max-w-sm bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-bold font-heading">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 rounded-full hover:bg-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterItem />
              </div>
              <div className="p-4 border-t border-border bg-card">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

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
            <div className="mb-6 bg-card border border-border p-2 rounded-xl shadow-sm flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-muted-foreground ml-2 h-5 w-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input 
                type="text" 
                placeholder="Search by job title, description, or location..."
                className="w-full bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground px-2 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

