import { useDispatch, useSelector } from 'react-redux';
import GetAllCompany from '../../FechingData/GetAllCompany';
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
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
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    GetAllCompany(token, dispatch, API_URL);
    GetSingleJob(jobId);


    const singlejob = useSelector(store => store.job.singlejob);
    const companies = useSelector(store => store.company.AllCompany);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',

    });


    useEffect(() => {
        if (singlejob) {
            setFormData({
                title: singlejob.title || '',
                description: singlejob.description || '',
                requirements: singlejob.requirements || '',
                salary: singlejob.salary || '',
                location: singlejob.location || '',
                jobType: singlejob.jobType || '',
                experience: singlejob.experienceLevel || '',
                position: singlejob.position || '',

            });
        }
    }, [singlejob]);

    const onSubmit = async (olddata, e) => {
        setLoading(true)
        //   console.log(olddata)
        e.preventDefault();

        const companydetail = companies.filter(comp => comp.name === olddata.name)
        //   console.log(companydetail,"comp")
        const companyId = companydetail[0]?._id;
        //   console.log(company ,"id")

        const data = { ...olddata, companyId }
        // console.log(data)   

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
        <div className='flex items-center justify-center  my-16'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-8 md:max-w-3xl w-[90%] border border-gray-200 shadow-lg rounded-md'>
                <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="title"
                            {...register("title")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.title}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            {...register("description")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.description}

                        />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                            type="text"
                            name="requirements"
                            {...register("requirements")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.requirements}

                        />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                            type="text"
                            name="salary"
                            {...register("salary")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.salary}

                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            {...register("location")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.location}

                        />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input
                            type="text"
                            name="jobType"
                            {...register("jobType")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.jobType}

                        />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input
                            type="text"
                            name="experience"
                            {...register("experience")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.experience}

                        />
                    </div>
                    <div>
                        <Label>No of Postion</Label>
                        <Input
                            type="number"
                            name="position"
                            {...register("position")}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            defaultValue={formData.position}

                        />
                    </div>
                    {
                        companies.length > 0 && (
                            <select name="company" id="company" className='border my-1 py-1 '  {...register("name")}>
                                <option id='select'>Select a company</option>
                                {
                                    companies.map((company) => (
                                        <option id={company._id}>{company?.name}</option>
                                    ))
                                }

                            </select>
                        )
                    }
                </div>
                {
                    loading
                        ?
                        (<Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>)
                        :
                        (<Button type="submit" className="w-full my-4 ">Post New Job</Button>)
                }

                {
                    companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                }
            </form>
        </div>

    )
}

export default Updatejob