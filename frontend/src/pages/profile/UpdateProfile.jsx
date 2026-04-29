import React, { useContext, useEffect, useState } from 'react'
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"

import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { AuthContext } from '../../Context-Api/AuthContext'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const UpdateProfile = ({ open, setOpen }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { userData, token } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    // ✅ Populate form when userData loads
    useEffect(() => {
        if (userData) {
            reset({
                fullName: userData?.fullname || "",
                email: userData?.email || "",
                phoneNumber: userData?.phoneNumber || "",
                bio: userData?.profile?.bio || "",
                skills: userData?.profile?.skills?.join(', ') || ""
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data) => {
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
            setLoading(true);

            const response = await fetch(`${API_URL}/user/v2/api/update/profile`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const res = await response.json();

                toast.success(res.message || "Profile updated successfully");

                // optional: close modal
                setOpen(false);

                // optional: reload or refetch user
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            } else {
                const err = await response.json();
                toast.error(err.message || "Update failed");
            }

        } catch (error) {
            console.error(error);
            toast.error("Server error. Try again!");
        } finally {
            setLoading(false);
        }
    };

    // optional safety
    if (!userData) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>

                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4 py-4'>

                        {/* Name */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Name</Label>
                            <Input
                                className="col-span-3"
                                {...register('fullName', { required: "Name is required" })}
                            />
                        </div>

                        {/* Email */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Email</Label>
                            <Input
                                type="email"
                                className="col-span-3"
                                {...register('email', { required: "Email is required" })}
                            />
                        </div>

                        {/* Phone */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Number</Label>
                            <Input
                                className="col-span-3"
                                {...register('phoneNumber')}
                            />
                        </div>

                        {/* Bio */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Bio</Label>
                            <Input
                                className="col-span-3"
                                {...register('bio')}
                            />
                        </div>

                        {/* Skills */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Skills</Label>
                            <Input
                                className="col-span-3"
                                {...register('skills')}
                            />
                        </div>

                        {/* File Upload */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Resume</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="col-span-3"
                                {...register('file')}
                            />
                        </div>

                        <DialogFooter>
                            {
                                loading ? (
                                    <Button className="w-full my-4" disabled>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full my-4">
                                        Update
                                    </Button>
                                )
                            }
                        </DialogFooter>

                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfile;