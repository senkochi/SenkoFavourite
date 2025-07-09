import React from 'react'
import HeroBanner from '../components/Navbar/HeroBanner'
import Intro from '../components/Intro'
import TopCategory from '../components/TopCategory'

const Home = () => {
  return (
    <div className='page-container'>
        <HeroBanner />
        <Intro />
        <TopCategory />
    </div>
  )
}

export default Home