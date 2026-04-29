import React, { useEffect, useState } from 'react'
import { Edit2, Eye, Loader2, Trash2, MapPin, Briefcase, IndianRupee, Users } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import GetAdminCreateJob from '@/FechingData/GetAdminCreateJob'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import toast from 'react-hot-toast'
import DeleteConfirmModal from '../../components/component/DeleteConfirmModal'

const JobTabel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const API_URL = import.meta.env.VITE_API_URL;

  const serarchjobtext = useSelector(store => store.job.searchjobtext)
  const AdminJobs = useSelector(store => store.job.AdminJobs)

  const [filterJob, setFilterJob] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const getjobs = async () => {
    try {
      setIsLoading(true);
      await GetAdminCreateJob(token, dispatch, API_URL);
    } catch (error) {
      console.log("error: ", error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getjobs();
  }, [])

  useEffect(() => {
    if (AdminJobs && AdminJobs.length > 0) {
      if (serarchjobtext && serarchjobtext.length > 0) {
        const filtered = AdminJobs.filter((job) => {
          return (job?.company?.name && job?.company?.name.toLowerCase().includes(serarchjobtext.toLowerCase())) || 
                 (job?.title && job?.title.toLowerCase().includes(serarchjobtext.toLowerCase()));
        })
        setFilterJob(filtered)
      } else {
        setFilterJob(AdminJobs)
      }
    } else {
      setFilterJob([]);
    }
  }, [serarchjobtext, AdminJobs]);

  const openDeleteModal = (id) => {
    setSelectedJobId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedJobId) return;
    setIsDeleting(true);

    try {
        const response = await fetch(`${API_URL}/user/v2/api/admin/delete/job/${selectedJobId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            toast.success("Job deleted successfully");
            getjobs(); // Refresh the list
        } else {
            const errData = await response.json();
            toast.error(errData.message || "Failed to delete job");
        }
    } catch (error) {
        toast.error("Internal server error");
    } finally {
        setIsDeleting(false);
        setDeleteModalOpen(false);
        setSelectedJobId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[50vh]">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    )
  }

  if (filterJob.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-[40vh] bg-card border border-border rounded-2xl shadow-sm p-8 mt-10">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="text-muted-foreground w-8 h-8" />
          </div>
          <div className='text-foreground text-center text-xl font-bold font-heading'>
              No Jobs Found
          </div>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm text-center">
              You haven't posted any jobs yet, or none match your search criteria.
          </p>
          <Button onClick={() => navigate('/admin/create/job')} className="mt-6 rounded-xl">
              Post a New Job
          </Button>
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20'>
        {filterJob.map((job) => (
          <div key={job?._id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg text-foreground font-heading line-clamp-1">{job?.title}</h3>
                <p className="text-sm text-muted-foreground font-medium">{job?.company?.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" onClick={() => navigate(`/admin/update/${job._id}`)}>
                    <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={() => openDeleteModal(job._id)}>
                    <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              <Badge variant="secondary" className="font-medium bg-primary/10 text-primary border-transparent shadow-none hover:bg-primary/20">
                {job?.jobType || "Full Time"}
              </Badge>
              <Badge variant="outline" className="font-medium text-muted-foreground">
                {job?.position} Positions
              </Badge>
            </div>
            
            <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0 text-primary" />
                    <span className="line-clamp-1">{job?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IndianRupee className="w-4 h-4 shrink-0 text-primary" />
                    <span>{job?.salary} LPA</span>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-border flex gap-3">
                <Button className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate(`/admin/get/applicant/${job._id}`)}>
                    <Users className="w-4 h-4 mr-2" />
                    Applicants
                </Button>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmModal 
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Job Listing?"
          description={`Are you sure you want to delete this job? All applications tied to this job will also be removed.`}
          isDeleting={isDeleting}
      />
    </>
  )
}

export default JobTabel


