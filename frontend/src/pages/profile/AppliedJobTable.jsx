import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'
import GetApplyJobs from '../../FechingData/GetApplyJobs'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'

const AppliedJobTable = () => {
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL;

    const applyjobs = useSelector(store => store.job.applyjob)

    useEffect(() => {
        const getapplyjobs = async () => {
            try {
                setIsLoading(true);
                await GetApplyJobs(token, dispatch, API_URL);
            } catch (error) {
                console.log("error: ", error)
            }
            finally {
                setIsLoading(false);
            }
        }
        getapplyjobs();
    }, [])


    return (
        <div>{
            isLoading ? (
                <div className='flex justify-center items-center h-[30vh]'>
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin " />
                </div>
            ) : applyjobs.length > 0 ? (
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
                        {applyjobs.map((appliedJob,index) => (
                            <TableRow key={index}>
                                <TableCell>{appliedJob?.createdAt.split('T')[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className='w-full h-[20vh] flex justify-center items-center'>
                <span className='text-[#020ef8] font-extrabold  text-wrap bg-gray-200 rounded-full px-4 py-2  text-center'>You haven't applied any job yet.</span>
                </div>
            )
        }

        </div>
    )
}

export default AppliedJobTable


