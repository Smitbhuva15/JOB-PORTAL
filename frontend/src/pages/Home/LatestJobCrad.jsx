import { Badge } from '../../components/ui/badge'
import React from 'react'

import { useSelector } from 'react-redux';

const LatestJobCrad = ({job}) => {
  const alljobs = useSelector(store => store.job.Alljobs)
//   console.log(alljobs)

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>

            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title }</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-[#020ef8] font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#2bd53f] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#a909b7] font-bold'} variant="ghost">{job?.salary}</Badge>
            </div>
        </div>
    )
}

export default LatestJobCrad