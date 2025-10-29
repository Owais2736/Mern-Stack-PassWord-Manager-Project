import React from 'react'
import Navbar from '../components/Navbar'
import DataBaseManager from '../components/DataBaseManager'
import Footer from '../components/Footer'

const PasswordManager = () => {
  return (
    <>
     <Navbar />
      <div className="min-hi-[85vh]">
        <DataBaseManager />
      </div>
      <Footer />
    
    </>
  )
}

export default PasswordManager