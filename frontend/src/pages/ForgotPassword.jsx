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
        <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto my-10 xl:max-w-7xl lg:max-w-5xl '>
            <div className='flex items-center justify-center '>
                <form onSubmit={handleSubmit(onSubmit)} className='md:w-1/2 w-[90%] border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-2'>Forgot Password</h1>
                    <p className='text-sm text-gray-500 mb-5'>Enter your email address to receive an OTP.</p>

                    <div className='my-4'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your registered email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-sm text-red-500">Email is required</span>}
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 ">Send OTP</Button>
                    )}

                    <div className='text-center mt-4'>
                        <span className='text-sm'>Remembered your password? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
