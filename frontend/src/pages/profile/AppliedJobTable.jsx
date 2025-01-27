import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'
import GetApplyJobs from '../../FechingData/GetApplyJobs'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {

    GetApplyJobs()
   const applyjobs=useSelector(store=>store.job.applyjob)
//    console.log(applyjobs)
    

    
    return (
        <div>
            <Table>
                <TableCaption className='mb-4'>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        applyjobs.length <= 0 ? <span className='text-[#020ef8] font-extrabold'>You haven't applied any job yet.</span> : applyjobs.map((appliedJob) => (
                            <TableRow >
                                <TableCell>{appliedJob?.createdAt.split('T')[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable