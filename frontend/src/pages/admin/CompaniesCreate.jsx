import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/Context-Api/AuthContext'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner';


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
    <div className='bg-background min-h-[calc(100vh-8rem)] py-12'>
      <div className='sm:max-w-md mx-auto px-4 w-full'>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-primary/5">
          <div className='mb-8 text-center'>
            <h1 className='font-bold text-2xl font-heading tracking-tight text-foreground'>Register New Company</h1>
            <p className='text-muted-foreground text-sm mt-2'>What would you like to call your new company?</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-semibold text-foreground">Company Name</Label>
              <Input
                type="text"
                className="h-11 bg-background border-border focus-visible:ring-primary"
                placeholder="e.g. JobLinker, Microsoft, Google..."
                {...register("companyName")}
              />
            </div>
            
            <div className='flex items-center gap-3 pt-4'>
              <Button 
                type="button"
                variant="outline" 
                className='w-full h-11 rounded-xl'
                onClick={() => navigate("/admin/compnies")}
              >
                Cancel
              </Button>
              {loading ? (
                <Button disabled className="w-full h-11 rounded-xl"> 
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                  Please wait 
                </Button>
              ) : (
                <Button type="submit" className="w-full h-11 rounded-xl shadow-sm hover:shadow-primary/25 transition-all">
                  Continue
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CompaniesCreate