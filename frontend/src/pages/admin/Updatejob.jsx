import { useDispatch, useSelector } from 'react-redux';
import GetAllCompany from '../../FechingData/GetAllCompany';
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context-Api/AuthContext';
import { useForm } from 'react-hook-form';
import GetSingleJob from '../../FechingData/GetSingleJob';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';


const Updatejob = () => {
    const params = useParams();
    const jobId = params.id;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));

    const singlejob = useSelector(store => store.job.singlejob);
    const companies = useSelector(store => store.company.AllCompany);

    const API_URL = import.meta.env.VITE_API_URL;

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

        const getsingaljob = async () => {
            try {
                setIsLoading(true);
                await GetSingleJob(jobId, token, dispatch, API_URL);
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false);
            }
        }
        getcompany();
        getsingaljob();
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (singlejob) {
            reset({
                title: singlejob.title || '',
                description: singlejob.description || '',
                requirements: Array.isArray(singlejob.requirements) ? singlejob.requirements.join(',') : (singlejob.requirements || ''),
                salary: singlejob.salary || '',
                location: singlejob.location || '',
                jobType: singlejob.jobType || '',
                experience: singlejob.experienceLevel || '',
                position: singlejob.position || '',
                name: singlejob.company?.name || ''
            });
        }
    }, [singlejob, reset]);

    const onSubmit = async (olddata, e) => {
        setLoading(true)
        e.preventDefault();

        const companydetail = companies.filter(comp => comp.name === olddata.name)
        const companyId = companydetail[0]?._id;

        const data = { ...olddata, companyId }

        try {
            const response = await fetch(`${API_URL}/user/v2/api/admin/update/job/${jobId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message)
                setTimeout(() => {
                    navigate('/admin/jobs');
                }, 2000);
            } else {
                const errormessage = await response.json();
                const mess = errormessage.message
                if (Array.isArray(mess)) {
                    mess.forEach(msg => toast.error(msg));
                } else {
                    toast.error(mess)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        isLoading ? (
            <div className='flex justify-center items-center h-[90vh] bg-background'>
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        ) : (
            <div className='bg-background min-h-[calc(100vh-8rem)] py-12'>
                <div className='sm:max-w-screen-md mx-auto px-4 w-full'>
                    <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-xl shadow-primary/5">
                        <div className='mb-8 text-center'>
                            <h1 className='font-bold text-3xl font-heading tracking-tight text-foreground'>Update Job Listing</h1>
                            <p className='text-muted-foreground text-sm mt-2'>Modify the details of this open position.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                            
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className="space-y-2">
                                    <Label className="font-semibold text-foreground">Job Title</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Senior Frontend Developer"
                                        className="bg-background border-border focus-visible:ring-primary h-11"
                                        {...register("title")}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold text-foreground">Company</Label>
                                    {companies.length > 0 ? (
                                        <select 
                                            className='flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                            {...register("name")}
                                        >
                                            <option value="">Select a company</option>
                                            {companies.map((company) => (
                                                <option key={company._id} value={company.name}>{company?.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="h-11 flex items-center px-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                            No companies registered
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-semibold text-foreground">Description</Label>
                                <Input
                                    type="text"
                                    placeholder="Describe the role and responsibilities..."
                                    className="bg-background border-border focus-visible:ring-primary h-11"
                                    {...register("description")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-semibold text-foreground">Requirements (comma separated)</Label>
                                <Input
                                    type="text"
                                    placeholder="e.g. React, Node.js, TypeScript"
                                    className="bg-background border-border focus-visible:ring-primary h-11"
                                    {...register("requirements")}
                                />
                            </div>

                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className="space-y-2">
                                    <Label className="font-semibold text-foreground">Location</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Remote, New York, Mumbai"
                                        className="bg-background border-border focus-visible:ring-primary h-11"
                                        {...register("location")}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="font-semibold text-foreground">Salary (LPA)</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 12"
                                        className="bg-background border-border focus-visible:ring-primary h-11"
                                        {...register("salary")}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold text-foreground">Job Type</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Full Time, Internship"
                                        className="bg-background border-border focus-visible:ring-primary h-11"
                                        {...register("jobType")}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold text-foreground">Experience Required (Years)</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. 2"
                                        className="bg-background border-border focus-visible:ring-primary h-11"
                                        {...register("experience")}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold text-foreground">Number of Positions</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 3"
                                        className="bg-background border-border focus-visible:ring-primary h-11"
                                        {...register("position")}
                                    />
                                </div>
                            </div>

                            {companies.length === 0 && (
                                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-center text-sm font-medium">
                                    * Please register a company first before updating a job.
                                </div>
                            )}

                            <div className="pt-6 flex gap-4">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => navigate('/admin/jobs')}
                                    className="w-full h-12 rounded-xl text-base font-semibold"
                                >
                                    Cancel
                                </Button>
                                {loading ? (
                                    <Button disabled className="w-full h-12 rounded-xl text-base font-semibold shadow-sm"> 
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                        Updating Job... 
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        disabled={companies.length === 0}
                                        className="w-full h-12 rounded-xl text-base font-semibold shadow-md hover:shadow-primary/25 transition-all"
                                    >
                                        Update Job
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export default Updatejob