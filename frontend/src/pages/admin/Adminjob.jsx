import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import React from 'react'
import JobTabel from './JobTabel'

export const Adminjob = () => {
    const navigate=useNavigate()
  return (
    <div className='max-w-6xl mx-auto my-10 '>
         <div className='flex items-center justify-between my-5'>
                <Input
                  className="w-fit"
                  placeholder="Company Name For Filter"
                //   value={searchInput} 
                //   onChange={handelSearch} 
                />
                <Button onClick={() => navigate('/admin/add/job')}>New Job</Button>
              </div>


              <div>
                <JobTabel />
              </div>
    </div>
  )
}
