import { RadioGroup } from '../components/ui/radio-group'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Loader2 } from 'lucide-react';
import { AuthContext } from '@/Context-Api/AuthContext';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';


const SingUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(AuthContext)
  const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    if (token) {
      navigate('/')
    }


  }, []);

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const API_URL = import.meta.env.VITE_API_URL;


  const onSubmit = async (data, e) => {

    setLoading(true)

    e.preventDefault();
    const formData = new FormData();
    formData.append('email', data.email)
    formData.append('fullname', data.fullname)
    formData.append('password', data.password)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('role', data.role)

    if (data.file[0]) {
      formData.append('file', data.file[0])
    }

    try {
      const response = await fetch(`${API_URL}/user/v2/api/signup`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const res = await response.json();
        toast.success(res.message)
        setTimeout(() => {
          navigate('/login');
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
    <div className='flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md bg-card text-card-foreground shadow-xl shadow-primary/5 border border-border rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-500'>
        <div className="text-center mb-8">
          <h1 className='font-bold text-3xl font-heading tracking-tight mb-2'>Create an account</h1>
          <p className="text-muted-foreground text-sm">Enter your details to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          
          <div className='space-y-2'>
            <Label htmlFor="fullname" className="font-semibold text-foreground">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="John Doe"
              className="bg-background border-border focus-visible:ring-primary h-11"
              {...register("fullname")}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor="email" className="font-semibold text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="bg-background border-border focus-visible:ring-primary h-11"
              {...register("email")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-semibold text-foreground">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="bg-background border-border focus-visible:ring-primary h-11 pr-10"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
              </button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor="phoneNumber" className="font-semibold text-foreground">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="bg-background border-border focus-visible:ring-primary h-11"
              {...register("phoneNumber")}
            />
          </div>

          <div className='pt-2'>
            <Label className="font-semibold text-foreground mb-3 block">Account Type</Label>
            <RadioGroup className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <div className="relative flex items-center p-4 border border-border rounded-xl hover:bg-accent/50 transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <Input
                    type="radio"
                    value="student"
                    className="sr-only"
                    {...register("role")}
                  />
                  <span className="font-medium text-sm">Student</span>
                </div>
              </label>

              <label className="cursor-pointer">
                <div className="relative flex items-center p-4 border border-border rounded-xl hover:bg-accent/50 transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <Input
                    type="radio"
                    value="recruiter"
                    className="sr-only"
                    {...register("role")}
                  />
                  <span className="font-medium text-sm">Recruiter</span>
                </div>
              </label>
            </RadioGroup>
          </div>

          <div className='space-y-2'>
            <Label htmlFor="fileUpload" className="font-semibold text-foreground">Profile Picture (Optional)</Label>
            <Input
              id="fileUpload"
              accept="image/*"
              type="file"
              className="bg-background border-border file:bg-muted file:text-foreground file:border-0 cursor-pointer"
              {...register('file')}
            />
          </div>

          {loading ? (
            <Button disabled className="w-full h-11 text-base font-semibold mt-6 shadow-md"> 
              <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
              Creating account... 
            </Button>
          ) : (
            <Button type="submit" className="w-full h-11 text-base font-semibold mt-6 shadow-md hover:shadow-primary/25 transition-all">
              Sign up
            </Button>
          )}

          <div className='text-center mt-6 text-sm text-muted-foreground'>
            Already have an account? <Link to="/login" className='text-primary font-semibold hover:underline ml-1'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SingUp