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
        <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto my-10 xl:max-w-7xl lg:max-w-5xl '>
            <div className='flex items-center justify-center '>
                <div className='md:w-1/2 w-[90%] border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-2'>Verify OTP</h1>
                    <p className='text-sm text-gray-500 mb-5'>Please enter the 6-digit OTP sent to your email.</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='my-4'>
                            <Label>OTP</Label>
                            <Input
                                type="text"
                                maxLength="6"
                                placeholder="Enter 6-digit OTP"
                                className="text-center tracking-[1em] font-mono text-lg"
                                {...register("otp", { 
                                    required: true, 
                                    minLength: 6, 
                                    maxLength: 6,
                                    pattern: /^[0-9]+$/
                                })}
                            />
                            {errors.otp && <span className="text-sm text-red-500">Please enter a valid 6-digit OTP</span>}
                        </div>

                        {loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Verifying
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Verify OTP</Button>
                        )}
                    </form>

                    <div className='text-center mt-6 border-t pt-4'>
                        <p className='text-sm text-gray-500 mb-2'>Didn't receive the OTP?</p>
                        {resendLoading ? (
                            <Button variant="outline" className="w-full" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Sending...
                            </Button>
                        ) : (
                            <Button 
                                variant="outline" 
                                className="w-full" 
                                onClick={handleResend}
                                disabled={cooldown > 0}
                            >
                                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
