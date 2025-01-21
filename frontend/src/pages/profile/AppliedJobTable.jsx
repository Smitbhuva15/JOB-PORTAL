import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'

const AppliedJobTable = () => {

    const allAppliedJobs=[1,2]
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
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
                        allAppliedJobs.length <= 0 ? <span className='text-[#020ef8] font-extrabold'>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow >
                                <TableCell>appliedJob?.createdAt</TableCell>
                                <TableCell>appliedJob.job?.title</TableCell>
                                <TableCell>appliedJob.job?.company?.name</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>appliedJob.status.toUpperCase</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable