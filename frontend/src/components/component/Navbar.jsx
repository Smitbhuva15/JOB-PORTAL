import React, { useContext } from 'react'
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
import { useSelector } from 'react-redux'
import { AuthContext } from '@/Context-Api/AuthContext'


const Navbar = () => {

  // const userData=useSelector(store=>store.user.userinfo)


  const { userData, setToken, handelLogout, isVerify } = useContext(AuthContext);
  // console.log(userData)


  const hasValidUserData = userData && Object.keys(userData).length > 0;


  return (
    <>
      <div className='bg-white '>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
          {
            userData && userData.role === "recruiter"
              ?
              (
                
                  <Link to='/admin/compnies'>
                    <div className='flex '>
                      <img src='/logo.png' alt='logo' className='w-20 sm:mt-12 sm:block hidden  ' />
                      <h1 className='text-2xl font-bold sm:mt-16 '>Job<span className='text-[#020ef8]'>Linker</span></h1>
                    </div>
                  </Link>
                
              )
              :
              (
                
                  <Link to='/home'>
                    <div className='flex '>
                      <img src='/logo.png' alt='logo' className='w-20 sm:mt-12 sm:block hidden   ' />
                      <h1 className='text-2xl font-bold sm:mt-16'>Job<span className='text-[#020ef8]'>Linker</span></h1>
                    </div>
                  </Link>
                
              )
          }

          <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center sm:gap-5 gap-1'>
              {
                userData && userData.role === 'recruiter'
                  ?
                  (<>
                    <Link to='/admin/compnies'><li>Companies</li></Link>
                    <Link to='/admin/jobs'><li>Jobs</li></Link>
                  </>
                  )
                  :
                  (
                    <>
                      <Link to='/'><li>Home</li></Link>
                      <Link to='jobs'><li>Jobs</li></Link>
                      <Link to='browse'><li>Browse</li></Link>

                    </>

                  )
              }


            </ul>
            {
              isVerify ?
                (<Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      <AvatarImage src={userData?.profile?.profilePhoto} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div>
                      <div className='flex gap-2 space-y-2'>
                        <Avatar>
                          <AvatarImage src={userData?.profile?.profilePhoto} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className='font-medium'>{userData?.fullname}</h4>
                          <p className='text-sm text-muted-foreground'>{userData?.profile?.bio}</p>
                        </div>
                      </div>
                      <div className='flex flex-col my-2 text-gray-600'>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <User2 />
                          <Button variant="link"> <Link to='/profile'>View Profile</Link></Button>
                        </div>
                        <div className='flex w-fit items-center gap-2 cursor-pointer' >
                          <LogOut />
                        <Link to='/home'><Button variant="link" onClick={() => { handelLogout() }}>Logout</Button></Link>  
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