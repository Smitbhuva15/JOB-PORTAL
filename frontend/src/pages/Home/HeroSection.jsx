import { Button } from '../../components/ui/button'
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setsearchjob } from '../../store/jobSlice';

const HeroSection = () => {

  const [input, setInput] = useState("");
  const navigate = useNavigate()
   const dispatch=useDispatch()
  const handelsearch = () => {
    navigate('/browse')
    dispatch(setsearchjob(input))
  }

  return (
    <>
      <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
          <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#020ef8] font-medium'>No. 1 Job Linker Website</span>
          <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#020ef8]'>Dream Jobs</span></h1>
          <p>Find your dream job today with top companies. Explore opportunities, apply, and build your career!</p>
          <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input
              type="text"
              placeholder='Find your dream jobs'
              className='outline-none border-none w-full'
              value={input}
              onChange={(e) => { setInput(e.target.value) }}

            />
            <Button className="rounded-r-full bg-[#020ef8]" onClick={handelsearch}>
              <Search className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection