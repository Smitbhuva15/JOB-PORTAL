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
    <div className='max-w-6xl mx-auto my-10 '>
         <div className='flex items-center justify-between my-5'>
                <Input
                  className="w-fit"
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
