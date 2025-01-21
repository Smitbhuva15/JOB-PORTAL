import { Button } from '../../ui/button'
import React from 'react'
import { Search } from 'lucide-react'

const HeroSection = () => {
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

                    />
                    <Button  className="rounded-r-full bg-[#020ef8]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
    </div>
    </div>
    </>
  )
}

export default HeroSection