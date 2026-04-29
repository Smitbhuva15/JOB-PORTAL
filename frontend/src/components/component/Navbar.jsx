import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../ui/button"
import { LogOut, User2, X, Briefcase, Menu } from 'lucide-react'
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
import { AuthContext } from '@/Context-Api/AuthContext'
import { adminheader, userheader } from '@/lib/config';
import { ThemeToggle } from '../ThemeToggle';

const Navbar = () => {
  const { userData, handelLogout, isVerify } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseMenu = () => setIsOpen(false);
  const handelToggle = () => setIsOpen(!isOpen);
  
  // Persist role to prevent flicker on reload
  useEffect(() => {
    if (userData?.role) {
      localStorage.setItem('user-role', userData.role);
    }
  }, [userData]);

  const handellogout = () => {
    localStorage.removeItem('user-role');
    handelLogout();
    navigate('/');
  }

  const storedRole = localStorage.getItem('user-role');
  const isRecruiter = (userData?.role === "recruiter") || (!userData && storedRole === "recruiter");
  const navLinks = isRecruiter ? adminheader : userheader;
  const homeRoute = isRecruiter ? '/admin/compnies' : '/home';

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm border-border' : 'bg-background border-transparent'}`}>
      <div className='container mx-auto px-4 md:px-8 max-w-7xl h-16 flex items-center justify-between'>
        
        {/* Logo */}
        <Link to={homeRoute} className="flex items-center gap-2 transition-transform hover:scale-105">
          <Briefcase className="w-8 h-8 text-primary" />
          <h1 className='text-2xl font-bold font-heading tracking-tight'>
            Job<span className='text-primary'>Linker</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          <ul className='flex items-center gap-6 font-medium text-sm text-muted-foreground'>
            {navLinks.map((header, index) => (
              <li key={index}>
                <Link to={header?.link} className="hover:text-foreground transition-colors duration-200">
                  {header?.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isVerify ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-transparent hover:border-primary transition-all">
                    <AvatarImage src={userData?.profile?.profilePhoto} alt="Profile" />
                    <AvatarFallback className="bg-primary/10 text-primary">{userData?.fullname?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72 p-4">
                  <div className="flex gap-4 items-start mb-4 pb-4 border-b">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={userData?.profile?.profilePhoto} />
                      <AvatarFallback className="bg-primary/10 text-primary">{userData?.fullname?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{userData?.fullname}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{userData?.profile?.bio || userData?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    {!isRecruiter && (
                      <Button variant="ghost" className="w-full justify-start gap-3" asChild>
                        <Link to='/profile'>
                          <User2 className="w-4 h-4" />
                          View Profile
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handellogout}>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className='flex items-center gap-3'>
                <Button variant="ghost" asChild>
                  <Link to='/login'>Login</Link>
                </Button>
                <Button asChild className="rounded-full px-6">
                  <Link to='/signup'>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={handelToggle}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={handleCloseMenu}
          />
          
          {/* Drawer Menu */}
          <div className="relative w-3/4 max-w-sm bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-heading font-bold text-lg">Menu</span>
              <Button variant="ghost" size="icon" onClick={handleCloseMenu}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="flex flex-col px-4 py-6 space-y-2 flex-1 overflow-y-auto">
              {navLinks.map((header, index) => (
                <Link
                  key={index}
                  to={header?.link}
                  onClick={handleCloseMenu}
                  className="text-lg font-medium text-foreground py-3 border-b border-border/50 hover:text-primary transition-colors"
                >
                  {header?.title}
                </Link>
              ))}
              
              {!isVerify ? (
                <div className="flex flex-col gap-3 pt-6 mt-auto">
                  <Button variant="outline" className="w-full" asChild onClick={handleCloseMenu}>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="w-full" asChild onClick={handleCloseMenu}>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-6 mt-auto border-t border-border mt-4">
                  <div className="flex items-center gap-3 mb-4 p-2 bg-primary/5 rounded-xl">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={userData?.profile?.profilePhoto} />
                      <AvatarFallback className="bg-primary/10 text-primary">{userData?.fullname?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{userData?.fullname}</span>
                      <span className="text-xs text-muted-foreground">{isRecruiter ? 'Recruiter' : 'Student'}</span>
                    </div>
                  </div>
                  {!isRecruiter && (
                    <Button variant="ghost" className="w-full justify-start text-base gap-3" asChild onClick={handleCloseMenu}>
                      <Link to="/profile"><User2 className="w-4 h-4" /> Profile</Link>
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start text-base text-destructive hover:bg-destructive/10 gap-3" onClick={() => { handleCloseMenu(); handellogout(); }}>
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

