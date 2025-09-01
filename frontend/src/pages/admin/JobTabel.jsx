import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Edit2, Eye, Loader2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import GetAdminCreateJob from '@/FechingData/GetAdminCreateJob'
import store from '@/store/store'
import { useNavigate } from 'react-router-dom'



const JobTabel = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const serarchjobtext = useSelector(store => store.job.searchjobtext)
  const AdminJobs = useSelector(store => store.job.AdminJobs)
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [filterJob, setFilterJob] = useState(AdminJobs)
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getjobs = async () => {
      try {
        setIsLoading(true);
        await GetAdminCreateJob(token, dispatch, API_URL);
      } catch (error) {
        console.log("error: ", error)
      }
      finally {
        setIsLoading(false);
      }
    }
    getjobs();
  }, [])


  useEffect(() => {
    if (AdminJobs && AdminJobs.length > 0) {
      setFilterJob(AdminJobs)
      setLoading(false);
    }
    else {
      setLoading(false);
    }
    if (serarchjobtext && serarchjobtext.length > 0) {
      const filtered = AdminJobs.filter((job) => {
        return job?.company?.name && job?.company?.name.toLowerCase().includes(serarchjobtext.toLowerCase()) || job?.title && job?.title.toLowerCase().includes(serarchjobtext.toLowerCase());
      })
      setFilterJob(filtered)
    }

  }, [serarchjobtext, AdminJobs]);


  return (

    isLoading ? (

      <div className="flex justify-center items-center w-full h-[50vh]">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    )
      : filterJob.length <= 0 ? (
        <div className='h-[50vh] flex justify-center items-center'><span className='text-red-500   md:bg-gray-200 px-4 py-2 rounded-full  text-center font-semibold text-wrap font-serif'>It looks like you haven’t added a company, or the search didn’t match.</span></div>
      )
        : (
          <div >
            <Table className='mt-10'>
              <TableCaption className="mb-4">A list of your recent posted jobs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  filterJob.map((job) => (

                    <tr key={job?._id}>
                      <TableCell>{job?.company?.name}</TableCell>
                      <TableCell>{job?.title}</TableCell>
                      <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
                      <TableCell className="text-right cursor-pointer">
                        <Popover>
                          <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                          <PopoverContent className="w-32">
                            <div onClick={() => navigate(`/admin/update/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                              <Edit2 className='w-4' />
                              <span>Edit</span>
                            </div>
                            <div onClick={() => navigate(`/admin/get/applicant/${job._id}`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                              <Eye className='w-4' />
                              <span>Applicants</span>
                            </div>
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

  )
}

export default JobTabel


