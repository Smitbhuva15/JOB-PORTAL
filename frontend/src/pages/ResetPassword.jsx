import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from 'sonner';

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
        <div className='flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md bg-card text-card-foreground shadow-xl shadow-primary/5 border border-border rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-500'>
                <div className="text-center mb-8">
                    <h1 className='font-bold text-3xl font-heading tracking-tight mb-2'>Create New Password</h1>
                    <p className='text-muted-foreground text-sm'>Please enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className="space-y-2 relative">
                        <Label htmlFor="newPassword" className="font-semibold text-foreground">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="bg-background border-border focus-visible:ring-primary h-11 pr-10"
                                {...register("newPassword", { 
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" }
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                            </button>
                        </div>
                        {errors.newPassword && <span className="text-sm text-destructive mt-1 block">{errors.newPassword.message}</span>}
                    </div>

                    <div className="space-y-2 relative">
                        <Label htmlFor="confirmPassword" className="font-semibold text-foreground">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                className="bg-background border-border focus-visible:ring-primary h-11 pr-10"
                                {...register("confirmPassword", { 
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match"
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-sm text-destructive mt-1 block">{errors.confirmPassword.message}</span>}
                    </div>

                    {loading ? (
                        <Button disabled className="w-full h-11 text-base font-semibold mt-6 shadow-md">
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Updating Password...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full h-11 text-base font-semibold mt-6 shadow-md hover:shadow-primary/25 transition-all">
                            Update Password
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
