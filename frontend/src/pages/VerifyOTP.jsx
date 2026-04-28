import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [cooldown, setCooldown] = useState(60);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const API_URL = import.meta.env.VITE_API_URL;
    const resetToken = sessionStorage.getItem('resetToken');

    useEffect(() => {
        if (!resetToken) {
            toast.error("Session expired or invalid. Please request a new OTP.");
            navigate('/forgot-password');
        }
    }, [resetToken, navigate]);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/user/v2/api/forgot-password/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resetToken,
                    otp: data.otp
                })
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message);
                navigate('/forgot-password/new-password');
            } else {
                const errormessage = await response.json();
                toast.error(errormessage.message || "Invalid OTP.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;
        setResendLoading(true);

        try {
            const response = await fetch(`${API_URL}/user/v2/api/forgot-password/resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ resetToken })
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message);
                setCooldown(60); // Reset timer
            } else {
                const errormessage = await response.json();
                toast.error(errormessage.message || "Failed to resend OTP.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setResendLoading(false);
        }
    };

    if (!resetToken) return null; // Wait for redirect

   
    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md bg-card text-card-foreground shadow-xl shadow-primary/5 border border-border rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-500'>
                <div className="text-center mb-8">
                    <h1 className='font-bold text-3xl font-heading tracking-tight mb-2'>Verify OTP</h1>
                    <p className='text-muted-foreground text-sm'>Please enter the 6-digit OTP sent to your email.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor="otp" className="font-semibold text-foreground">One Time Password</Label>
                        <Input
                            id="otp"
                            type="text"
                            maxLength="6"
                            placeholder="------"
                            className="text-center tracking-[1em] font-mono text-2xl h-14 bg-background border-border focus-visible:ring-primary uppercase"
                            {...register("otp", { 
                                required: true, 
                                minLength: 6, 
                                maxLength: 6,
                                pattern: /^[0-9]+$/
                            })}
                        />
                        {errors.otp && <span className="text-sm text-destructive mt-1 block">Please enter a valid 6-digit OTP</span>}
                    </div>

                    {loading ? (
                        <Button disabled className="w-full h-11 text-base font-semibold mt-6 shadow-md">
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Verifying...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full h-11 text-base font-semibold mt-6 shadow-md hover:shadow-primary/25 transition-all">
                            Verify OTP
                        </Button>
                    )}
                </form>

                <div className='text-center mt-8 pt-6 border-t border-border'>
                    <p className='text-sm text-muted-foreground mb-3'>Didn't receive the OTP?</p>
                    {resendLoading ? (
                        <Button variant="outline" className="w-full h-10 border-border" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Sending...
                        </Button>
                    ) : (
                        <Button 
                            variant="outline" 
                            className="w-full h-10 border-border hover:bg-accent/50 transition-colors" 
                            onClick={handleResend}
                            disabled={cooldown > 0}
                        >
                            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
