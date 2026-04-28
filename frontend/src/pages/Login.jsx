import { RadioGroup } from '../components/ui/radio-group'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setuser } from '../store/userSlice';
import { AuthContext } from '@/Context-Api/AuthContext';
import { Loader2 } from 'lucide-react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import toast from 'react-hot-toast'

const Login = () => {
  const { userData } = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // console.log(userData)
  // protect the routes.....?

  const [token1, setToken1] = useState(localStorage.getItem('token-jobportal'));


  useEffect(() => {
    if (token1) {
      navigate(userData?.Role === "recruiter" ? "/admin/companies" : "/home");
    }
  }, [token1, userData, navigate]);


  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = async (data, e) => {
    // console.log(data)
    const API_URL = import.meta.env.VITE_API_URL;

    setLoading(true)
    e.preventDefault();
    try {

      const response = await fetch(`${API_URL}/user/v2/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const res = await response.json();
        dispatch(setuser(res.userDetail))
        setToken(res.Token)
        localStorage.setItem('token-jobportal', res.Token)
        localStorage.setItem("user-role", res.userDetail.Role);

        toast.success(res.message)
        setTimeout(() => {
          // console.log(res.userDetail.Role)
          navigate(res.userDetail.Role === "recruiter" ? "/admin/compnies" : "/home");
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
          <h1 className='font-bold text-3xl font-heading tracking-tight mb-2'>Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-semibold text-foreground">Password</Label>
              <Link to="/forgot-password" className='text-sm text-primary font-medium hover:underline'>
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
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
                  <span className="font-medium">Student</span>
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
                  <span className="font-medium">Recruiter</span>
                </div>
              </label>
            </RadioGroup>
          </div>

          {loading ? (
            <Button disabled className="w-full h-11 text-base font-semibold mt-6 shadow-md"> 
              <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
              Signing in... 
            </Button>
          ) : (
            <Button type="submit" className="w-full h-11 text-base font-semibold mt-6 shadow-md hover:shadow-primary/25 transition-all">
              Login
            </Button>
          )}

          <div className='text-center mt-6 text-sm text-muted-foreground'>
            Don't have an account? <Link to="/signup" className='text-primary font-semibold hover:underline ml-1'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login