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
            <div className='flex justify-center items-center h-[90vh] bg-background'>
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        ) : (
            <div className='bg-background min-h-[calc(100vh-8rem)] py-12'>
                <div className='max-w-3xl mx-auto px-4 w-full'>
                    <div className="flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-10 w-10 rounded-full bg-card hover:bg-muted shadow-sm"
                                onClick={() => navigate("/admin/compnies")}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className='font-bold text-3xl font-heading tracking-tight text-foreground'>Company Setup</h1>
                                <p className="text-muted-foreground text-sm mt-1">Manage your company's profile, logo, and contact details.</p>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-card border border-border rounded-2xl shadow-xl shadow-primary/5 overflow-hidden">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="p-8 md:p-10 space-y-8">
                                    
                                    {/* Section 1: Basic Info */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold font-heading text-foreground mb-1">Company Details</h3>
                                            <p className="text-sm text-muted-foreground">This information will be displayed publicly on your job listings.</p>
                                        </div>
                                        
                                        <div className='grid md:grid-cols-2 gap-6'>
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-foreground">Company Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="e.g. Acme Corp"
                                                    className="bg-background border-border focus-visible:ring-primary h-11"
                                                    defaultValue={formData?.name}
                                                    {...register("name")}
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-foreground">Website</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="https://acmecorp.com"
                                                    className="bg-background border-border focus-visible:ring-primary h-11"
                                                    defaultValue={formData?.website}
                                                    {...register("website")}
                                                />
                                            </div>
                                            
                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="font-semibold text-foreground">Description</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="What does your company do?"
                                                    className="bg-background border-border focus-visible:ring-primary h-11"
                                                    defaultValue={formData?.description}
                                                    {...register("description")}
                                                />
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="font-semibold text-foreground">Headquarters Location</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="e.g. San Francisco, CA"
                                                    className="bg-background border-border focus-visible:ring-primary h-11"
                                                    defaultValue={formData?.location}
                                                    {...register("location")}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-border" />

                                    {/* Section 2: Branding */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold font-heading text-foreground mb-1">Brand Identity</h3>
                                            <p className="text-sm text-muted-foreground">Upload a logo to make your company stand out.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="font-semibold text-foreground">Company Logo (Optional if already set)</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                id="fileUpload"
                                                className="cursor-pointer bg-background border-border h-11 py-2.5 text-muted-foreground file:bg-primary/10 file:text-primary file:border-0 file:mr-4 file:px-4 file:rounded-md file:font-medium hover:file:bg-primary/20 transition-all"
                                                {...register("file")}
                                            />
                                            {singlecompanydata?.logo && (
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    A logo is already uploaded. Uploading a new one will replace it.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                </div>

                                {/* Footer Actions */}
                                <div className="bg-muted/50 p-6 md:px-10 border-t border-border flex items-center justify-end gap-4">
                                    <Button 
                                        type="button"
                                        variant="outline" 
                                        className="h-11 px-8 rounded-xl bg-background"
                                        onClick={() => navigate("/admin/compnies")}
                                    >
                                        Cancel
                                    </Button>
                                    {loading ? (
                                        <Button disabled className="h-11 px-8 rounded-xl shadow-sm">
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                            Saving Changes...
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="h-11 px-8 rounded-xl shadow-md hover:shadow-primary/25 transition-all">
                                            Save Changes
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default CompaniesManage