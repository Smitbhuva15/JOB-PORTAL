import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import React from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

const Compnies = () => {
  const navigate=useNavigate();
  return (
    <div className='max-w-6xl mx-auto my-10 '>
    <div className='flex items-center justify-between my-5'>
        <Input
            className="w-fit"
            placeholder="Company Name For Filter"
            
        />
        <Button onClick={()=>navigate('/admin/add/company')}>New Company</Button>
    </div>
    <CompaniesTable/>
</div>
  )
}

export default Compnies