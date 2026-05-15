
import React, { useContext } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Context-Api/AuthContext';
import toast from 'react-hot-toast';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { CheckCircle, XCircle, FileText, User2, Mail, Phone, Calendar } from 'lucide-react';
import EmptyState from '../../components/component/EmptyState';

const ApplicantsTable = () => {
    const {token} = useContext(AuthContext)
    const API_URL = import.meta.env.VITE_API_URL;
  
    const applicants = useSelector(store => store.application.applicantJobs)

    const setstatus = async (status, applicantid) => {
        try {
            const lowerstatus = status.toLowerCase()
            const sendstatus = {
                "status": lowerstatus
            }
         const response = await fetch(`${API_URL}/user/v2/api//update/status/${applicantid}`,{
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(sendstatus)
         })
            if (response.ok) {
                const res = await response.json()
                toast.success(res.message)
                // Optionally could refresh data here
            }
            else {
                const errormessage = await response.json()
                toast.error(errormessage.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    if (applicants?.applications?.length <= 0) {
        return (
            <EmptyState 
                icon={User2}
                title="No Applicants Yet"
                description="No one has submitted an application for this job opening."
            />
        )
    }

    return (
        <div className='bg-card border border-border rounded-2xl shadow-xl shadow-primary/5 overflow-hidden mb-44 mt-8'>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="font-semibold py-4">Applicant</TableHead>
                            <TableHead className="font-semibold py-4">Contact Info</TableHead>
                            <TableHead className="font-semibold py-4">Resume</TableHead>
                            <TableHead className="font-semibold py-4">Applied Date</TableHead>
                            <TableHead className="font-semibold py-4 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="hover:bg-muted/30 transition-colors">
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {item?.applicant?.fullname?.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-foreground">{item?.applicant?.fullname}</div>
                                            <div className="text-xs text-muted-foreground capitalize">
                                                Status: <Badge variant="outline" className={`ml-1 ${
                                                    item.status === 'accepted' ? 'text-green-500 border-green-200 bg-green-50' :
                                                    item.status === 'rejected' ? 'text-red-500 border-red-200 bg-red-50' :
                                                    'text-blue-500 border-blue-200 bg-blue-50'
                                                }`}>
                                                    {item.status || 'Pending'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="w-3.5 h-3.5" />
                                            {item?.applicant?.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="w-3.5 h-3.5" />
                                            {item?.applicant?.phoneNumber || 'N/A'}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {item.applicant?.profile?.resume ? (
                                        <a 
                                            href={item?.applicant?.profile?.resume} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover:underline font-medium bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            <FileText className="w-4 h-4" />
                                            {item?.applicant?.profile?.resumeOriginalName || 'Resume'}
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground text-sm flex items-center gap-2">
                                            <XCircle className="w-4 h-4" /> No Resume
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(item?.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200 h-8"
                                            onClick={() => setstatus("Accepted", item._id)}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-1.5" />
                                            Accept
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200 h-8"
                                            onClick={() => setstatus("Rejected", item._id)}
                                        >
                                            <XCircle className="w-4 h-4 mr-1.5" />
                                            Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ApplicantsTable