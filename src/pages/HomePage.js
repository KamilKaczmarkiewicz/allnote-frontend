import React from 'react'
import MainNavBar from '../components/MainNavBar/MainNavBar'
import HeroSection from '../components/HomePage/HeroSection'
import MainFooter from '../components/Footer/MainFooter'
import HookThemForScroll from '../components/HomePage/HookThemForScroll'

const HomePage = () => {
  return (
    <>
    <MainNavBar />
    <div className='container'>
      <HeroSection />
      <HookThemForScroll />
    </div>
    <MainFooter />
    </>
  )
}

export default HomePage