import LatestJobs from './Home/LatestJobs'
import Category from './Home/Category'
import HeroSection from './Home/HeroSection'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate()
  if(localStorage.getItem('user-role')==='recruiter'){
    navigate('/admin/compnies');
  }

  return (
  <>
  <HeroSection/>
  <Category />
  <LatestJobs />
  </>
  )
}

export default Home