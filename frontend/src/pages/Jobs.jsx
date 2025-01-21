import FilterItem from '../components/component/jobs/FilterItem'
import Job from '../components/component/jobs/Job'
import React from 'react'

const Jobs = () => {
  const randomitem = [1,2,3,4,5,5,4,2,4]
  return (
    <>
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterItem />
          </div>

          {
            randomitem.length <= 0 ? <span className='mb-96'>Job not found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    randomitem.map(() => (

                      <Job />

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