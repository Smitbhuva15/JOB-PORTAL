import React, { useContext, useState } from 'react'
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { AuthContext } from '../../Context-Api/AuthContext'
import { useForm } from 'react-hook-form';

import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const UpdateProfile = ({ open, setOpen }) => {


    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { userData } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const user_fullName = userData?.fullname || "";
    const user_email = userData?.email || "";
    const user_phoneNumber = userData?.phoneNumber || "";
    const user_bio = userData?.profile?.bio || "";
    const user_skill = userData?.profile?.skills?.map((item) => item) || "";

    const { token, setToken } = useContext(AuthContext);

    const onSubmit = async (data, e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('fullname', data.fullName);
        formData.append('bio', data.bio);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('skills', data.skills);

        if (data.file && data.file[0]) {
            formData.append('file', data.file[0]);
        }

        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/user/v2/api/update/profile`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const res = await response.json();

                setTimeout(() => {
                    window.location.reload(true)
                }, 2000);
                toast.success(res.message);
    
            } else {
                const errorMessage = await response.json();

                toast.error(errorMessage.message);

            }
        } catch (error) {

            toast.error('Missing information or server is currently unavailable!');
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader >
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4 py-4' >

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                defaultValue={user_fullName}

                                className="col-span-3"
                                {...register('fullName')}
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user_email}
                                {...register('email')}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input
                                id="number"
                                name="number"
                                defaultValue={user_phoneNumber}
                                {...register('phoneNumber')}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                defaultValue={user_bio}
                                className="col-span-3"
                                {...register('bio')}
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                defaultValue={user_skill}
                                className="col-span-3"
                                {...register('skills')}
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="image/*"
                                className="col-span-3"
                                {...register('file')}
                            />
                        </div>

                        <DialogFooter>
                            {
                                loading
                                    ?
                                    (<Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>)
                                    :
                                    (<Button type="submit" className="w-full my-4 ">Update</Button>)
                            }
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default UpdateProfile