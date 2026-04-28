import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
    
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const API_URL = import.meta.env.VITE_API_URL;
    const resetToken = sessionStorage.getItem('resetToken');

 useEffect(() => {
    if (!resetToken && !isPasswordUpdated) {
        toast.error("Session expired or invalid. Please start again.");
        navigate('/forgot-password');
    }
}, [resetToken, navigate, isPasswordUpdated]);

    const password = watch("newPassword");

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/user/v2/api/forgot-password/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resetToken,
                    newPassword: data.newPassword
                })
            });

            if (response.ok) {
                const res = await response.json();
                setIsPasswordUpdated(true); 

                toast.success(res.message);
                sessionStorage.removeItem('resetToken');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                const errormessage = await response.json();
            
                toast.error(errormessage.message || "Failed to update password.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (!resetToken) return null;

    return (
        <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto my-10 xl:max-w-7xl lg:max-w-5xl '>
            <div className='flex items-center justify-center '>
                <form onSubmit={handleSubmit(onSubmit)} className='md:w-1/2 w-[90%] border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-2'>Create New Password</h1>
                    <p className='text-sm text-gray-500 mb-5'>Please enter your new password.</p>

                    <div className="my-4 relative">
                        <Label>New Password</Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...register("newPassword", { 
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" }
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                        </button>
                        {errors.newPassword && <span className="text-sm text-red-500 mt-1 block">{errors.newPassword.message}</span>}
                    </div>

                    <div className="my-4 relative">
                        <Label>Confirm Password</Label>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            {...register("confirmPassword", { 
                                required: "Please confirm your password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                        </button>
                        {errors.confirmPassword && <span className="text-sm text-red-500 mt-1 block">{errors.confirmPassword.message}</span>}
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating Password
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Update Password</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
