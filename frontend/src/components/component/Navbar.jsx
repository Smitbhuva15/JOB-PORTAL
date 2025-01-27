import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../ui/button"
import { LogOut, User2 } from 'lucide-react'
import { FaBars } from "react-icons/fa";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu"



const Navbar = () => {

  // const userData=useSelector(store=>store.user.userinfo)


  const { userData, setToken, handelLogout, isVerify } = useContext(AuthContext);
  // console.log(userData)


  const hasValidUserData = userData && Object.keys(userData).length > 0;




  return (
    <>
      <div className='bg-white sm:max-w-screen-sm md:max-w-2xl  xl:max-w-7xl lg:max-w-5xl mx-auto  w-[90%]'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
          {
            userData && userData.role === "recruiter"
              ?
              (

                <Link to='/admin/compnies'>
                  <div className='flex '>
                    <img src='/logo.png' alt='logo' className='md:w-20 mt-12 w-16 sm:block hidden ' />
                    <h1 className='sm:text-2xl font-bold sm:mt-16 text-xl mt-4 '>Job<span className='text-[#020ef8]'>Linker</span></h1>
                  </div>
                </Link>

              )
              :
              (

                <Link to='/home'>
                  <div className='flex '>
                    <img src='/logo.png' alt='logo' className='md:w-20 mt-12 w-16 sm:block hidden ' />
                    <h1 className='sm:text-2xl font-bold sm:mt-16 text-xl mt-4'>Job<span className='text-[#020ef8]'>Linker</span></h1>
                  </div>
                </Link>

              )
          }

          <div className='flex items-center gap-12'>
            <ul className='md:flex font-medium items-center sm:gap-5 gap-1 hidden'>
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


            <div className='md:hidden block mr-9'>
              <Popover >
                <PopoverTrigger asChild>
                  <Button variant="outline" className='-mr-9 sm:mt-0 mt-4'><FaBars /></Button>
                </PopoverTrigger>
                <PopoverContent className="md:w-80 w-64">
                  <div>

                    <div className='flex flex-col my-2 text-gray-600'>
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>

                        <Button variant="link" > <Link to='/home' className='ml-16'>Home</Link></Button>
                      </div>
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>

                        <Button variant="link"> <Link to='/jobs' className='ml-16'>Jobs</Link></Button>
                      </div>
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>

                        <Button variant="link"> <Link to='/browse' className='ml-16'>Browse</Link></Button>
                      </div>

                      {

                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <Link to='/login'> <Button className=' mt-3 ml-[68px]'>Login</Button></Link>
                        </div>
                      }
                      <div className='flex w-fit items-center gap-2 cursor-pointer' >

                        <Link to='/signup'> <Button className="bg-[#020ef8] hover:bg-[#202477] mt-3 ml-16">Signup</Button></Link>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {
              isVerify ?
                (<Popover >
                  <PopoverTrigger asChild>
                    <Avatar className="sm:mt-0 mt-4 sm:ml-0 -ml-8">
                      <AvatarImage src={userData?.profile?.profilePhoto} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="md:w-80 w-64">
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
                        {
                          userData && userData.role === "student" && (<div className='flex w-fit items-center gap-2 cursor-pointer'>
                            <User2 />
                            <Button variant="link"> <Link to='/profile'>View Profile</Link></Button>
                          </div>)
                        }
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
                  <div className='md:flex items-center gap-2 hidden '>
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