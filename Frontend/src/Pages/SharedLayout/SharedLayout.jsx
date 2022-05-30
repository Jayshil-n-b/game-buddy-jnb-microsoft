import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function SharedLayout() {
  return (
      <div className="container">
          <Header/>
          <Outlet/>
          <Footer/>
      </div>
  )
}
