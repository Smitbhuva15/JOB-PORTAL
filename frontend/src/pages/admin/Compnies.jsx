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
  // const [input, setInput] = useState("");

  
  GetAllCompany();
  const AllCompany = useSelector(store => store.company.AllCompany);

  const [searchInput, setSearchInput] = useState("");
  const [filterProducts, setFilterProducts] = useState( AllCompany);

   console.log(AllCompany)


  const handelSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
    const filtered = AllCompany.filter((product) => product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    
    setFilterProducts(filtered);
}


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
        <Table className='mt-10'>
          <TableCaption>A list of your recent registered companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filterProducts.length <= 0
                ?
                (<span className='text-red-700 text-2xl font-extrabold'>Companies Are Not Found!!!</span>)
                :
                (filterProducts.map((company) => (

                  < tr key={company._id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company?.logo} />
                      </Avatar>

                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company?.createdAt?.split('T')[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/setup/company/${company._id}`)}>
                            <Edit2 className='w-4' />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </tr >

                ))

                )
            }

          </TableBody>
        </Table>

      </div>
    </div>
  )
}

export default Compnies