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
    <div className=' sm:max-w-screen-sm md:max-w-2xl my-16 xl:max-w-6xl lg:max-w-5xl w-[90%] mx-auto '>
         <div className='flex items-center justify-between my-5 sm:flex-row flex-col'>
                <Input
                  className="w-fit sm:mb-0 mb-5"
                  placeholder="Company Name For Filter"
                  value={input} 
                  onChange={handelinput} 
                />
                <Button onClick={() => navigate('/admin/add/job')}>New Job</Button>
              </div>


              <div>
                <JobTabel />
              </div>
    </div>
  )
}
