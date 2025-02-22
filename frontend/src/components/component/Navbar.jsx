import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../ui/button"
import { LogOut, User2, X } from 'lucide-react'
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
import { HiOutlineMenuAlt3 } from "react-icons/hi";



const Navbar = () => {

  const { userData, setToken, handelLogout, isVerify } = useContext(AuthContext);

  const hasValidUserData = userData && Object.keys(userData).length > 0;

  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()

  const handleCloseMenu = () => {
    setIsOpen(false)
  }
  const handelToggle = () => {
    setIsOpen(!isOpen)
  }



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



            <div className=" md:hidden block  sm:mt-0 mt-4 ">
              <button
                onClick={handelToggle}
                className={`text-black focus:outline-none ${isOpen ? "border border-white rounded" : " "} `}>

                <HiOutlineMenuAlt3 className="size-6" />
              </button>
            </div>
            {
               userData && userData.role === 'recruiter'
               ?(
                
                  isOpen && (
                
                    <div
                    className={`fixed top-0 left-0 w-full h-full bg-blue-600 bg-opacity-90 z-50 md:hidden flex flex-col items-center justify-center 
                      transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
                  >
                   
                    <button
                      onClick={handleCloseMenu}
                      className="absolute top-5 right-5 text-white text-3xl"
                    >
                      <X size={30} />
                    </button>
              
                 
                    <ul className="flex flex-col space-y-8 text-center">
                      <li className="navitem">
                        <Link
                          to="/admin/compnies"
                          onClick={handleCloseMenu}
                          className="text-white font-bold text-2xl"
                        >
                          Companies
                        </Link>
                      </li>
              
                      <li className="navitem">
                        <Link
                          to="/admin/jobs"
                          onClick={handleCloseMenu}
                          className="text-white font-bold text-2xl"
                        >
                          Jobs
                        </Link>
                      </li>
              
              
                    </ul>
              
                    
                  
                  </div>

                    
                    
                  )

                
               )
               :
               (
                isOpen && (
                  <div
                  className={`fixed top-0 left-0 w-full h-full bg-blue-600 bg-opacity-90 z-50 md:hidden flex flex-col items-center justify-center 
                    transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
                >
                 
                  <button
                    onClick={handleCloseMenu}
                    className="absolute top-5 right-5 text-white text-3xl"
                  >
                    <X size={30} />
                  </button>
            
               
                  <ul className="flex flex-col space-y-8 text-center">
                    <li className="navitem">
                      <Link
                        to="home"
                        onClick={handleCloseMenu}
                        className="text-white font-bold text-2xl"
                      >
                        Home
                      </Link>
                    </li>
            
                    <li className="navitem">
                      <Link
                        to="jobs"
                        onClick={handleCloseMenu}
                        className="text-white font-bold text-2xl"
                      >
                        Jobs
                      </Link>
                    </li>
            
                    <li className="navitem">
                      <Link
                        to="browse"
                        onClick={handleCloseMenu}
                        className="text-white font-bold text-2xl"
                      >
                        Browse
                      </Link>
                    </li>
                  </ul>
            
                  
                  <div className="flex flex-col items-center mt-10">
                    <Link to="/login" onClick={handleCloseMenu}>
                      <Button className="w-40">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={handleCloseMenu} className="mt-4">
                      <Button className="w-40 bg-[#020ef8] hover:bg-[#202477]">
                        Signup
                      </Button>
                    </Link>
                  </div>
                </div>
                )
            
                
               )


           
            }

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
                          <Link to='/'><Button variant="link" 
                          onClick={() => {
                             handelLogout() 
                             navigate('/')
                          }}>Logout</Button></Link>
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

