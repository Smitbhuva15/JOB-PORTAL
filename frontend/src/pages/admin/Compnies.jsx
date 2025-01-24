import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import React, { useEffect } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setserachtext } from '../../store/companyslice'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import GetAllCompany from '../../FechingData/GetAllCompany'
import { useSelector } from 'react-redux'


const Compnies = () => {
  const navigate = useNavigate();
  GetAllCompany();
  const [searchInput, setSearchInput] = useState("");

 const dispatch=useDispatch()

  const handelSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
}  
useEffect(() => {
  dispatch(setserachtext(searchInput))
}, [searchInput]);


  return (
    <div className='max-w-6xl mx-auto my-10 '>
      <div className='flex items-center justify-between my-5'>
        <Input
          className="w-fit"
          placeholder="Company Name For Filter"
          value={searchInput} 
          onChange={handelSearch} 
        />
        <Button onClick={() => navigate('/admin/add/company')}>New Company</Button>
      </div>

      {/* companytabel */}
      <div>
       <CompaniesTable />
      </div>
    </div>
  )
}

export default Compnies