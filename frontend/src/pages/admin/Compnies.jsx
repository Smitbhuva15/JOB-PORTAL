import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import React, { useEffect } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setserachtext } from '../../store/companyslice'


const Compnies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState("");

  const handelSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
  }

  useEffect(() => {
    dispatch(setserachtext(searchInput))
  }, [searchInput]);

  return (
    <div className='bg-background min-h-[calc(100vh-8rem)] py-8'>
      <div className='sm:max-w-screen-sm md:max-w-2xl mx-auto xl:max-w-6xl lg:max-w-5xl px-4 sm:px-6 lg:px-8 w-full'>
        
        <div className='flex items-center justify-between my-8 sm:flex-row flex-col gap-4 border-b border-border pb-6'>
          <div>
            <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">Registered Companies</h1>
            <p className="text-muted-foreground mt-1">Manage and view all your associated companies.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <Input
                className="pl-10 w-full bg-card shadow-sm border-border focus-visible:ring-primary"
                placeholder="Search companies..."
                value={searchInput}
                onChange={handelSearch}
              />
            </div>
            <Button onClick={() => navigate('/admin/add/company')} className="shadow-sm whitespace-nowrap">
              Register Company
            </Button>
          </div>
        </div>

        <CompaniesTable />
      </div>
    </div>
  )
}

export default Compnies