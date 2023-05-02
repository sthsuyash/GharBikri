import React from 'react'
import './App.scss'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// components
import Nav from './Layouts/Header/Nav'
import Footer from './Layouts/Footer/Footer'

import AppRoutes from './Routes'

function App() {

  return (
    <div className="max-w-[2000px] mx-auto">
      <Nav />
      <ToastContainer />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App;