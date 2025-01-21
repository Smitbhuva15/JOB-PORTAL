import LatestJobs from '../components/component/home/LatestJobs'
import Category from '../components/component/home/Category'
import HeroSection from '../components/component/home/HeroSection'
import React from 'react'

const Home = () => {
  return (
  <>
  <HeroSection/>
  <Category />
  <LatestJobs />
  </>
  )
}

export default Home