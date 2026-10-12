import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Header />
        <main className='min-h-[calc(100vh-100px)]'>
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

export default Layout