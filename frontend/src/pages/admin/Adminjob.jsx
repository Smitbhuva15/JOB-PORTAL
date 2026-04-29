import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import React, { useEffect, useState } from 'react'
import JobTabel from './JobTabel'
import { useDispatch } from 'react-redux'
import { getjobtext } from '../../store/jobSlice'

export const Adminjob = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [input, setInput] = useState("");

    useEffect(() => {
     dispatch(getjobtext(input))
    }, [input]);

    const handelinput=(e)=>{
      setInput(e.target.value);   
    }

  return (
    <div className='bg-background min-h-[calc(100vh-8rem)] py-8'>
      <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto xl:max-w-6xl lg:max-w-5xl px-4 sm:px-6 lg:px-8 w-full'>
        
        <div className='flex items-center justify-between my-8 sm:flex-row flex-col gap-4 border-b border-border pb-6'>
          <div>
            <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Posted Jobs</h1>
            <p className="text-muted-foreground mt-1">Manage your job listings and view applicants.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <Input
                className="pl-10 w-full bg-card shadow-sm border-border focus-visible:ring-primary"
                placeholder="Search jobs by title or company..."
                value={input}
                onChange={handelinput}
              />
            </div>
            <Button onClick={() => navigate('/admin/add/job')} className="shadow-sm whitespace-nowrap">
              Post New Job
            </Button>
          </div>
        </div>

        <div>
          <JobTabel />
        </div>
      </div>
    </div>
  )
}
