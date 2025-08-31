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
    <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto  xl:max-w-7xl lg:max-w-5xl w-[90%]'>
      <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
          <span className=' md:text-md text-sm mt-5  mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#020ef8] font-medium'>No. 1 Job Linker Website</span>
          <h1 className='md:text-5xl font-bold text-3xl '>Search and apply  <br /> smarter for your <span className='text-[#020ef8]'>dream career </span></h1>
          <p className=''>Access thousands of career opportunities across industries. Apply quickly and grow with the right organization!</p>
          <div className='flex md:w-[40%] w-[80%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
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
      </div>
    </>
  )
}

export default HeroSection