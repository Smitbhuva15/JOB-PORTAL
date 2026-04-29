import { useDispatch, useSelector } from 'react-redux';
import GetAllCompany from '../../FechingData/GetAllCompany';
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

import React, { useContext, useState } from 'react'
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context-Api/AuthContext';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminCreatJob = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const companies = useSelector(store => store.company.AllCompany)
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

     GetAllCompany(token, dispatch, API_URL);


    const onSubmit = async (olddata, e) => {
        setLoading(true)
        //   console.log(olddata)
        e.preventDefault();

        const companydetail = companies.filter(comp => comp.name === olddata.name)
        //   console.log(companydetail,"comp")
        const companyId = companydetail[0]?._id;
        //   console.log(comnpayId ,"id")

        const data = { ...olddata, companyId }
        // console.log(data ,"data")

        try {
            const response = await fetch(`${API_URL}/user/v2/api/post/job`, {
                method: 'POST',
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

            }
            else {
                const errormessage = await response.json();

                const mess = errormessage.message
                const isAarry = await Array.isArray(mess);
                if (isAarry) {
                    for (let i = 0; i < mess.length; i++) {
                        toast.error(mess[i]);
                    }
                }
                else {
                    toast.error(mess)
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(error)
        }
        finally {
            setLoading(false)
        }


    }


    return (
        <div className='bg-background min-h-[calc(100vh-8rem)] py-12'>
            <div className='sm:max-w-screen-md mx-auto px-4 w-full'>
                <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-xl shadow-primary/5">
                    <div className='mb-8 text-center'>
                        <h1 className='font-bold text-3xl font-heading tracking-tight text-foreground'>Post a New Job</h1>
                        <p className='text-muted-foreground text-sm mt-2'>Fill in the details to publish a new open position.</p>
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
                                * Please register a company first before posting a job.
                            </div>
                        )}

                        <div className="pt-6">
                            {loading ? (
                                <Button disabled className="w-full h-12 rounded-xl text-base font-semibold shadow-sm"> 
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                    Publishing Job... 
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    disabled={companies.length === 0}
                                    className="w-full h-12 rounded-xl text-base font-semibold shadow-md hover:shadow-primary/25 transition-all"
                                >
                                    Post New Job
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminCreatJob