import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const response = await fetch(`${API_URL}/user/v2/api/forgot-password/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message);
                // Store resetToken to use in next steps
                sessionStorage.setItem('resetToken', res.resetToken);
                setTimeout(() => {
                    navigate('/forgot-password/otp');
                }, 1500);
            } else {
                const errormessage = await response.json();
                toast.error(errormessage.message || "Failed to send OTP.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md bg-card text-card-foreground shadow-xl shadow-primary/5 border border-border rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-500'>
                <div className="text-center mb-8">
                    <h1 className='font-bold text-3xl font-heading tracking-tight mb-2'>Forgot Password</h1>
                    <p className='text-muted-foreground text-sm'>Enter your email address to receive an OTP.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor="email" className="font-semibold text-foreground">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="bg-background border-border focus-visible:ring-primary h-11"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-sm text-destructive mt-1 block">Email is required</span>}
                    </div>

                    {loading ? (
                        <Button disabled className="w-full h-11 text-base font-semibold mt-6 shadow-md">
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Sending OTP...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full h-11 text-base font-semibold mt-6 shadow-md hover:shadow-primary/25 transition-all">
                            Send OTP
                        </Button>
                    )}

                    <div className='text-center mt-6 text-sm text-muted-foreground'>
                        Remembered your password? <Link to="/login" className='text-primary font-semibold hover:underline ml-1'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
