import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Page404 = () => {
  return (
    <>
      <h3>Page not found</h3>
      <h3>
        <Link to='/'>Return Home</Link>
      </h3>
    </>
  )
}

export default Page404
