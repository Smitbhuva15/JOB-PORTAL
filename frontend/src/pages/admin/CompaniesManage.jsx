import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Label } from '../../components/ui/label';
import GetsingleCompny from '../../FechingData/GetsingleCompny';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/Context-Api/AuthContext';
import { getstateinfo } from '../../store/companyslice';
import toast from 'react-hot-toast';

const CompaniesManage = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const companyId = params.id;
    const navigate = useNavigate()

    // const [isUpdate,setIsUpdate]=useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const [isLoading, setIsLoading] = useState(true);


    const singlecompanydata = useSelector(store => store.company.Singlecompany)
    const isUpdate = useSelector(store => store.company.isupdate)
    const API_URL = import.meta.env.VITE_API_URL;

    const { register, handleSubmit, formState: { errors }, } = useForm();



    const [formData, setFormData] = useState({
        name: '',
        description: '',
        website: '',
        location: '',


    });

    useEffect(() => {
        const getcompany = async () => {
            try {
                setIsLoading(true);
                await GetsingleCompny(companyId, token, dispatch, isUpdate, API_URL)
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false);
            }
        }
        getcompany();
    }, [])

    useEffect(() => {
        if (singlecompanydata) {
            setFormData({
                name: singlecompanydata?.name || '',
                description: singlecompanydata?.description || '',
                website: singlecompanydata?.website || '',
                location: singlecompanydata?.location || '',

            });
        }
    }, [singlecompanydata]);


    const onSubmit = async (data, e) => {
        setLoading(true)
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
            const response = await fetch(`${API_URL}/user/v2/api/update/company/${companyId}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            if (response.ok) {
                const res = await response.json();
                dispatch(getstateinfo())
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
        finally {
            setLoading(false)
        }
    }

    return (
        isLoading ? (
            <div className='flex justify-center items-center h-[90vh]'>
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin " />
            </div>
        ) : (
            <div className='md:max-w-xl w-[90%] mx-auto my-10 md:h-[60vh]'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-5 p-8 '>
                        <div onClick={() => navigate("/admin/compnies")} className="flex items-center gap-2 border-2 p-1 px-5 font-semibold cursor-pointer  rounded-sm  shadow-2xl bg-gray-100 hover:bg-gray-200 ">
                            <ArrowLeft />
                            <span>Back</span>
                        </div>
                        <h1 className='font-bold sm:text-xl text-md'>Company Setup</h1>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                defaultValue={formData?.name}
                                {...register("name")}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                defaultValue={formData?.description}
                                {...register("description")}


                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                defaultValue={formData?.website}

                                {...register("website")}

                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                defaultValue={formData?.location}
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

                    {
                        loading ? <Button className="w-full my-4"> < Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                    }
                </form>
            </div >
        )

    )
}

export default CompaniesManage