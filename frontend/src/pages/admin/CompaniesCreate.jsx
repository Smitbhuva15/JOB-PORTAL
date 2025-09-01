import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/Context-Api/AuthContext'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'


const CompaniesCreate = () => {


  const navigate = useNavigate()
  const { token } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);


  const { register, handleSubmit, formState: { errors }, } = useForm();
 
  const onSubmit = async (data, e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/v2/api/register/company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const res = await response.json();
        const compnyId = res.createCompany._id;


        toast.success(res.message)
        setTimeout(() => {
          navigate(`/admin/setup/company/${compnyId}`)
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
    <div className='sm:max-w-screen-sm md:max-w-2xl  my-20 xl:max-w-4x lg:max-w-3xl w-[90%] h-[50vh] mx-auto'>
      <div className='my-10'>
        <h1 className='font-bold text-2xl'>Your Company Name</h1>
        <p className='text-gray-500'>What would you like to give your company name? </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobLinker,Microsoft,Google etc."
          {...register("companyName")}
        />
        <div className='flex items-center gap-2 my-10 '>
          <div 
          className='border-2 p-1 px-5 font-semibold cursor-pointer hover:bg-gray-200 rounded-sm bg-gray-100'
           onClick={() => navigate("/admin/compnies")}>Cancel</div>
          {
            loading
              ?
              (<Button className=""> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>)
              :
              (<Button >Continue</Button>)
          }

        </div>
      </form>
    </div>
  )
}

export default CompaniesCreate