import GetApplicant from '../../FechingData/GetApplicant';
import React, { useContext } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Context-Api/AuthContext';
import toast from 'react-hot-toast';



const ApplicantsTable = () => {
    const selectedstatus=["Accepted", "Rejected"];
    const {token}=useContext(AuthContext)
    const API_URL = import.meta.env.VITE_API_URL;
  
    const applicants = useSelector(store => store.application.applicantJobs)

    const setstatus=async(status,applicantid)=>{
        try {

            console.log(applicantid)
            const lowerstatus=status.toLowerCase()
            console.log(lowerstatus)
            const sendstatus={
                "status":lowerstatus
            }
         const response=await fetch(`${API_URL}/user/v2/api//update/status/${applicantid}`,{
            method:"PATCH",
            headers:{
                "Authorization":`Bearer ${token}`,
                 "Content-Type": "application/json"
            },
            body:JSON.stringify(sendstatus)
         })
            if(response.ok){
                const res=await response.json()
                // console.log( res);
                toast.success(res.message)
            }
            else{
                const errormessage=await response.json()
                toast.error(errormessage.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Table>
                <TableCaption className="mb-3">A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span className="text-blue-600 cursor-pointer" >NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                selectedstatus.map((status,i)=>(
                                                    <div key={i} onClick={()=>setstatus(status ,item._id)} className='flex w-fit items-center my-2 cursor-pointer'>
                                                        {status}
                                                    </div>
                                                ))

                                                
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable