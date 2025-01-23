import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/Context-Api/AuthContext'


const CompaniesCreate = () => {


  const navigate = useNavigate()
  const { token } = useContext(AuthContext);
  
  const { register, handleSubmit, formState: { errors }, } = useForm();

const onSubmit =async(data, e) => {
      // console.log(data)
      e.preventDefault();
       try {
            const response=await fetch(`http://localhost:5000/user/v2/api/register/company`,{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${token}`
              },
              body:JSON.stringify(data)
            });

             if(response.ok){
              const res=await response.json();
              const compnyId=res.createCompany._id;
              

            toast.success(res.message)
            setTimeout(() => {  
                navigate(`/admin/setup/company/${compnyId}`) 
            }, 2000);
             
             }
            else{
              const errormessage = await response.json();
             
              const mess = errormessage.message
              const isAarry= await Array.isArray(mess);
                if(isAarry){
                  for(let i=0;i<mess.length;i++){
                    toast.error(mess[i]);
                  }
                }
                else{
                  toast.error(mess)
                }
            }
            
          } catch (error) {
            console.log(error);
            toast.error(error)
          }
  
  
    }


  return (
    <div className='max-w-4xl mx-auto'>
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
        <div className='flex items-center gap-2 my-10'>
          <Button variant="outline" onClick={() => navigate("/admin/compnies")}>Cancel</Button>
          <Button >Continue</Button>
        </div>
      </form>
    </div>
  )
}

export default CompaniesCreate