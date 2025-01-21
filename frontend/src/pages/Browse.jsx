import Job from './jobs/Job'
import React from 'react'

const Browse = () => {
   
  const random=[1,2,3,,4,5,6,7,8]

  return (
    <div>
      <div className='max-w-7xl mx-auto my-10'>
      <h1 className={`font-bold text-xl  mt-8`}  >Search Results {random.length}</h1>
      <div className={`grid grid-cols-3 gap-4 ${random.length<=3? 'mb-80' :'mb-0' }`}>
                    {
                         random.map((job) => {
                            return (
                                <Job  />
                            )
                        })
                    }
                </div>
      </div>
    </div>
  )
}

export default Browse