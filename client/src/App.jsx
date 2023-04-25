import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import './App.scss'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, Routes } from 'react-router-dom'

// components
import Nav from './Layouts/Header/Nav'
import Home from './Pages/Home'
import Footer from './Layouts/Footer/Footer'

// pages
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashBoard from './Pages/DashBoard'

import Rent from './Pages/Rent'
import Buy from './Pages/Buy'
import Sell from './Pages/Sell'

// error page
import Error404 from './Routes/Error404'

import { SERVER_URL } from './Config';
import PropertyDetails from './Pages/PageDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/auth/is-verify`, {
        headers: { token: localStorage.token }
      });

      const parseRes = response.data;
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <Nav />

      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Home isAuthenticated={isAuthenticated} />
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (<LoginPage setAuth={setAuth} />
            ) : (
              <Navigate replace to="/dashboard" />
            )}
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? (<RegisterPage setAuth={setAuth} />
            ) : (
              <Navigate replace to="/dashboard" />
            )}
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (<DashBoard setAuth={setAuth} />
            ) : (
              <Navigate replace to="/login" />
            )}
        />

        <Route
          path='/rent'
          element={
            <Rent />
          }
        />

        <Route
          path='/buy'
          element={
            <Buy />
          }
        />

        <Route
          path='/propertyDetails'
          element={
            <PropertyDetails />
          }
        />

        <Route
          path='/sell'
          element={
            isAuthenticated ? (<Sell />
            ) : (
              <Navigate replace to="/login" />
            )}
        />
        

        <Route
          path='*'
          element={<Error404 />}
        />

      </Routes>

      <Footer />
    </>
  )
}

export default App;