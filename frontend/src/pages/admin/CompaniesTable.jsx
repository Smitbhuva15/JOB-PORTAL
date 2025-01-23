import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import GetAllCompany from '../../FechingData/GetAllCompany'
import { useSelector } from 'react-redux'
import store from '@/store/store'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {

    GetAllCompany();
 const navigate=useNavigate()
    const allCompany = useSelector(store => store.company.AllCompany);
    // console.log(allCompany);

    return (
        <div>
            <Table className='mt-10'>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allCompany.length <= 0
                            ?
                            (<span className='text-red-700 text-2xl font-extrabold'>You Have't Registered Any Company Yet!!</span>)
                            :
                            (allCompany.map((company) => (
                               
                                    < tr key={company._id}>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage src={company?.logo} />
                                            </Avatar>

                                        </TableCell>
                                        <TableCell>{company?.name}</TableCell>
                                        <TableCell>{company?.createdAt?.split('T')[0]}</TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={()=>navigate(`/admin/setup/company/${company._id}`)}>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </tr >
                               
                            ))

                            )
                    }

                </TableBody>
            </Table>

        </div>
    )
}

export default CompaniesTable

