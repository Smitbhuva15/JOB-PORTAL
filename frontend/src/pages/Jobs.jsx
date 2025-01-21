import FilterItem from './jobs/FilterItem'
import Job from './jobs/Job'
import React from 'react'

const Jobs = () => {
  const randomitem = [1,2,3,4,5,6,7,8]
  return (
    <>
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterItem />
          </div>

          {
            randomitem.length <= 0 ? <span className='mb-96 text-[#020ef8] text-5xl font-mono '>Job Not Found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    randomitem.map((index) => (

                      <Job  key={index}/>

                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Jobs