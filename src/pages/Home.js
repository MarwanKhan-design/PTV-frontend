import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  useEffect(() => {
    document.title = 'Home | PTV Project'
  })
  return (
    <>
      <h2>Home</h2>
    </>
  )
}

export default Home
