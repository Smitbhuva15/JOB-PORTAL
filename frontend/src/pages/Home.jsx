import LatestJobs from './Home/LatestJobs'
import Category from './Home/Category'
import HeroSection from './Home/HeroSection'
import FeaturesSection from './Home/FeaturesSection'
import HowItWorksSection from './Home/HowItWorksSection'
import TestimonialsSection from './Home/TestimonialsSection'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('user-role') === 'recruiter') {
      navigate('/admin/compnies');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
   
      <div className="bg-muted/5 py-10">
        <LatestJobs />
      </div>
      <TestimonialsSection />
    </div>
  )
}

export default Home