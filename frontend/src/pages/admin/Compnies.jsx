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
    <div className=' sm:max-w-screen-sm md:max-w-2xl my-16 xl:max-w-6xl lg:max-w-5xl w-[90%] mx-auto  '>
      <div className='flex items-center justify-between my-5 sm:flex-row flex-col '>
        <Input
          className="w-fit sm:mb-0 mb-5"
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