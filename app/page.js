'use client';

import React from 'react'
import UpcomingGames from './gameDataBase/upcoming'
import NewLaunch from './gameDataBase/newLaunch'
import NavBar from './mainNavi/navBar'
import Footer from './mainNavi/footer'

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className=' mt-28 pb-8 h-full w-full bg-gradient-to-b from-black to-gray-600'>
        <h1 className="text-3xl mb-8 text-center underline underline-offset-8">New Launched Games</h1>
        <NewLaunch />
        <h1 className="text-3xl mb-8 mt-8 text-center underline underline-offset-8">Upcoming Games</h1>
        <UpcomingGames />
      </div>
      <Footer />
    </main>
  )
}
