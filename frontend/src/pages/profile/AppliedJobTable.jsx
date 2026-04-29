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
        <div className="rounded-xl border border-border overflow-hidden bg-card">
            {isLoading ? (
                <div className='flex justify-center items-center min-h-[30vh]'>
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
            ) : applyjobs.length > 0 ? (
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold text-foreground">Date</TableHead>
                            <TableHead className="font-semibold text-foreground">Job Role</TableHead>
                            <TableHead className="font-semibold text-foreground">Company</TableHead>
                            <TableHead className="text-right font-semibold text-foreground">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applyjobs.map((appliedJob, index) => (
                            <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                                <TableCell className="text-muted-foreground">{appliedJob?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className="font-medium text-foreground">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-muted-foreground">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge 
                                        variant="secondary"
                                        className={`
                                            ${appliedJob?.status === "rejected" ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' : ''}
                                            ${appliedJob?.status === "pending" ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20' : ''}
                                            ${appliedJob?.status === "accepted" ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20' : ''}
                                            px-2.5 py-0.5 rounded-full font-medium shadow-none
                                        `}
                                    >
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className='w-full min-h-[25vh] flex flex-col justify-center items-center p-6'>
                    <div className='text-muted-foreground text-center text-lg font-medium mb-2'>No Applications Yet</div>
                    <span className='text-sm text-muted-foreground bg-muted/50 rounded-full px-4 py-1.5 text-center'>
                        You haven't applied to any jobs. Explore opportunities to get started!
                    </span>
                </div>
            )}
        </div>
    )
}

export default AppliedJobTable


