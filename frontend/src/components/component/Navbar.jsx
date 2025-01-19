import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../ui/button"
import { LogOut, User2 } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"


const Navbar = () => {

  const user = false;

  return (
    <>
      <div className='bg-white '>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <Link to='/'>
          <div className='flex '>
            <img src='/logo.png' alt='logo' className='w-20 sm:mt-12 sm:block hidden ' />
            <h1 className='text-2xl font-bold sm:mt-16'>Job<span className='text-[#020ef8]'>Linker</span></h1>
          </div>
          </Link>

          <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center sm:gap-5 gap-1'>
              <Link to='/home'><li>Home</li></Link>
              <Link to='jobs'><li>Jobs</li></Link>
              <Link to='browse'><li>Browse</li></Link>

            </ul>
            {
              user ?
                (<Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div>
                      <div className='flex gap-2 space-y-2'>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className='font-medium'>full name</h4>
                          <p className='text-sm text-muted-foreground'>bio...</p>
                        </div>
                      </div>
                      <div className='flex flex-col my-2 text-gray-600'>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <User2 />
                          <Button variant="link"> View Profile</Button>
                        </div>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <LogOut />
                          <Button variant="link">Logout</Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>)
                :
                (
                  <div className='flex items-center gap-2'>
                    <Link to='/login'> <Button >Login</Button></Link>
                    <Link to='/signup'> <Button className="bg-[#020ef8] hover:bg-[#202477]">Signup</Button></Link>
                  </div>
                )
            }




          </div>


        </div>
      </div>
    </>


  )
}

export default Navbar