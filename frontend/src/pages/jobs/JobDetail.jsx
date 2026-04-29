import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '@/Context-Api/AuthContext'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Loader2, MapPin, Briefcase, IndianRupee, Clock, CalendarDays, Users, Building2, ChevronLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import GetApplicant from '@/FechingData/GetApplicant'

const JobDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;
    const API_URL = import.meta.env.VITE_API_URL;
    const [applied, setApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { token, userData } = useContext(AuthContext);
    const [singleJobData, setSingleJobData] = useState({});
    
    const applicants = useSelector(store => store?.application?.applicantJobs)
    const isApplied = applied || applicants?.applications?.some(application => application?.applicant?._id === userData?._id) || false;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getApplicant = async () => {
            try {
                setIsLoading(true);
                await GetApplicant(jobId, token, dispatch, API_URL);
            } catch (error) {
                console.log("error: ", error)
            } finally {
                setIsLoading(false);
            }
        }
        getApplicant();
    }, [jobId, token, dispatch, API_URL])

    const applyJob = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/user/v2/api/apply/job/${jobId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json();
                setApplied(true)
                toast.success(data.message)
            } else {
                const errorMessage = await response.json();
                toast(errorMessage.message);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fechingsingleJobData = async () => {
        try {
            const response = await fetch(`${API_URL}/user/v2/api/get/jobbyid/${jobId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json();
                setSingleJobData(data.job)
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fechingsingleJobData();
    }, [jobId]);

    const daysAgo = singleJobData?.createdAt 
        ? Math.floor((new Date() - new Date(singleJobData.createdAt)) / (1000 * 24 * 60 * 60))
        : 0;

    return (
        singleJobData === null || Object.keys(singleJobData).length === 0 ? (
            <div className="flex justify-center items-center w-full min-h-[calc(100vh-8rem)] bg-background">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        ) : (
            <div className='bg-background min-h-[calc(100vh-8rem)] py-8'>
                <div className='sm:max-w-screen-sm md:max-w-3xl xl:max-w-7xl lg:max-w-5xl px-4 sm:px-6 lg:px-8 w-full mx-auto'>
                    <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground" onClick={() => navigate(-1)}>
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Jobs
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content (Left Column) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Job Header Card */}
                            <div className="bg-card border border-border shadow-sm rounded-2xl p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    <Avatar className="h-20 w-20 border border-border shadow-sm rounded-xl">
                                        <AvatarImage src={singleJobData?.company?.logo} alt={singleJobData?.company?.name} className="object-cover" />
                                        <AvatarFallback className="bg-primary/5 text-primary rounded-xl text-2xl font-bold">
                                            {singleJobData?.company?.name?.charAt(0) || 'C'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h1 className='font-bold text-2xl sm:text-3xl font-heading text-foreground mb-2'>
                                            {singleJobData?.title}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
                                            <span className="flex items-center gap-1 font-medium text-foreground">
                                                <Building2 className="w-4 h-4" /> {singleJobData?.company?.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" /> {singleJobData?.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {daysAgo === 0 ? "Posted Today" : `Posted ${daysAgo}d ago`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-border'>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-medium px-3 py-1">
                                        {singleJobData?.postion} Positions
                                    </Badge>
                                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 font-medium px-3 py-1">
                                        {singleJobData?.jobType}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 font-medium px-3 py-1">
                                        {singleJobData?.experienceLevel} yrs Exp.
                                    </Badge>
                                </div>
                            </div>

                            {/* Description Card */}
                            <div className="bg-card border border-border shadow-sm rounded-2xl p-6 sm:p-8">
                                <h2 className='text-xl font-bold font-heading text-foreground mb-4'>Job Description</h2>
                                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground">
                                    <p className="whitespace-pre-line leading-relaxed">
                                        {singleJobData?.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Sidebar (Right Column) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Action Card */}
                                <div className="bg-card border border-border shadow-sm rounded-2xl p-6">
                                    <div className="mb-6 space-y-4">
                                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                                            <span className="text-muted-foreground flex items-center gap-2 text-sm"><IndianRupee className="w-4 h-4"/> Salary</span>
                                            <span className="font-semibold text-foreground">{singleJobData?.salary} LPA</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                                            <span className="text-muted-foreground flex items-center gap-2 text-sm"><Briefcase className="w-4 h-4"/> Role</span>
                                            <span className="font-semibold text-foreground text-right">{singleJobData?.title}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                                            <span className="text-muted-foreground flex items-center gap-2 text-sm"><Users className="w-4 h-4"/> Applicants</span>
                                            <span className="font-semibold text-foreground">{singleJobData?.applications?.length || 0} applied</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                                            <span className="text-muted-foreground flex items-center gap-2 text-sm"><CalendarDays className="w-4 h-4"/> Posted</span>
                                            <span className="font-semibold text-foreground">{singleJobData?.createdAt?.split("T")[0]}</span>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <Button disabled className="w-full h-12 text-base font-medium rounded-xl">
                                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Processing...
                                        </Button>
                                    ) : isLoading ? (
                                        <Button disabled className="w-full h-12 text-base font-medium rounded-xl bg-muted text-muted-foreground">
                                            Loading Status...
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={applyJob}
                                            disabled={isApplied}
                                            className={`w-full h-12 text-base font-semibold rounded-xl transition-all ${isApplied ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 opacity-100 hover:bg-emerald-500/20' : 'bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5'}`}
                                        >
                                            {isApplied ? 'Already Applied' : 'Apply Now'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default JobDetail

