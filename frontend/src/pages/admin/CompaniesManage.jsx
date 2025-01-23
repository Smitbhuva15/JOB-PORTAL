import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

import { ArrowLeft } from 'lucide-react';

import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Label } from '../../components/ui/label';
import GetsingleCompny from '../../FechingData/GetsingleCompny';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '@/Context-Api/AuthContext';
import { getstateinfo } from '../../store/companyslice';

const CompaniesManage = () => {
    const params = useParams()
    const companyId = params.id;
    const navigate = useNavigate()
    GetsingleCompny(companyId)
    // const [isUpdate,setIsUpdate]=useState(false);
    const dispath=useDispatch()
    const { token } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = async (data, e) => {

        // console.log(data)
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('website', data.website)
        formData.append('location', data.location)


        if (data.file[0]) {
            formData.append('file', data.file[0])
        }

        try {
            const response = await fetch(`http://localhost:5000/user/v2/api/update/company/${companyId}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            if (response.ok) {
                const res = await response.json();
                // console.log(res);
        
                dispath(getstateinfo())
                toast.success(res.message)
                setTimeout(() => {
                   navigate('/admin/compnies')
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



    }


    const singlecompanydata = useSelector(store => store.company.Singlecompany)


    return (
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex items-center gap-5 p-8'>
                    <Button onClick={() => navigate("/admin/compnies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className='font-bold text-xl'>Company Setup</h1>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            defaultValue={singlecompanydata?.name}
                            {...register("name")}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            defaultValue={singlecompanydata?.description}
                            {...register("description")}


                        />
                    </div>
                    <div>
                        <Label>Website</Label>
                        <Input
                            type="text"
                            name="website"
                            defaultValue={singlecompanydata?.website}

                            {...register("website")}

                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            defaultValue={singlecompanydata?.location}
                            {...register("location")}


                        />
                    </div>
                    <div>
                        <Label>Logo</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            id="fileUpload"
                            name="file"
                            className="cursor-pointer mt-1"
                            {...register("file")}

                        />
                    </div>
                </div>
                <Button type="submit" className="w-full my-4">Update</Button>

            </form>
        </div>
    )
}

export default CompaniesManage