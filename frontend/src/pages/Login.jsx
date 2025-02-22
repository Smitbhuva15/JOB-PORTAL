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
    <>
      <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto my-10 xl:max-w-7xl lg:max-w-5xl '>
        <div className='flex items-center justify-center '>
          <form onSubmit={handleSubmit(onSubmit)} className='md:w-1/2 w-[90%] border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Login</h1>


            <div className='my-2'>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="Enter Email"
                {...register("email")}

              />
            </div>


            <div className="my-2 relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
              </button>
            </div>



            <div className='flex items-center justify-between '>
              <RadioGroup className="flex items-center gap-4 my-5 ">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    className="cursor-pointer"
                    {...register("role")}
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>

                <div className="flex items-center space-x-2 ">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="cursor-pointer"
                    {...register("role")}
                  />
                  <Label htmlFor="r1">Recruiter</Label>
                </div>

              </RadioGroup>


            </div>
            {
              loading
                ?
                (<Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>)
                :
                (<Button type="submit" className="w-full my-4 ">Login</Button>)
            }


            <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>

          </form>
        </div>
      </div>


    </>
  )
}

export default Login