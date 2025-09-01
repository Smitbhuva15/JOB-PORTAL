import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Edit2, Loader2, MoreHorizontal } from 'lucide-react'
import GetAllCompany from '../../FechingData/GetAllCompany'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const API_URL = import.meta.env.VITE_API_URL;

    const searchcompanytext = useSelector(store => store.company.searchtext);
    const AllCompany = useSelector(store => store.company.AllCompany);

    const [filterCompany, setFilterCompany] = useState(AllCompany);
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getcompany = async () => {
            try {
                setIsLoading(true);
                await GetAllCompany(token, dispatch, API_URL);
            } catch (error) {
                console.log("error: ", error)
            }
            finally {
                setIsLoading(false);
            }
        }
        getcompany();
    }, [])


    useEffect(() => {
        if (AllCompany && AllCompany.length > 0) {
            setFilterCompany(AllCompany)
        }
       

        if (searchcompanytext && searchcompanytext.length > 0) {
            const filtered = AllCompany.filter((company) => {
                return company?.name && company?.name.toLowerCase().includes(searchcompanytext.toLowerCase())
            })
            setFilterCompany(filtered)
        }

    }, [AllCompany, searchcompanytext]);


    return (

        isLoading ? (

            <div className="flex justify-center items-center w-full h-[50vh]">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        ) :
            filterCompany.length <= 0 ?

                (<div className='h-[50vh] flex justify-center items-center'><span className='text-red-500   md:bg-gray-200 px-4 py-2 rounded-full  text-center font-semibold text-wrap font-serif'>It looks like you haven’t added a company, or the search didn’t match.</span></div>)
                :
                (<div className={`${filterCompany.length<=5 ?"h-[50vh]":""}`}>
                    <Table className={`mt-10 `}>
                        <TableCaption className="mb-4">A list of your recent registered companies</TableCaption>
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
                                filterCompany.map((company) => (
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
                                                    <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/setup/company/${company._id}`)}>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </tr >

                                ))


                            }
                        </TableBody>
                    </Table>

                </div>
                )
    )
}

export default CompaniesTable


// filterCompany.length <= 0
//     ?
//     (<span className='text-red-500 font-light text-lg font-serif'>You Have't Registered Any Company Yet!!</span>)
//     :
//     (filterCompany.map((company) => (

//         < tr key={company._id}>
//             <TableCell>
//                 <Avatar>
//                     <AvatarImage src={company?.logo} />
//                 </Avatar>

//             </TableCell>
//             <TableCell>{company?.name}</TableCell>
//             <TableCell>{company?.createdAt?.split('T')[0]}</TableCell>
//             <TableCell className="text-right cursor-pointer">
//                 <Popover>
//                     <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
//                     <PopoverContent className="w-32">
//                         <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/setup/company/${company._id}`)}>
//                             <Edit2 className='w-4' />
//                             <span>Edit</span>
//                         </div>
//                     </PopoverContent>
//                 </Popover>
//             </TableCell>
//         </tr >

//     ))

//     )

