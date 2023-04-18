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

// error page
import Error404 from './Routes/Error404'

import { SERVER_URL } from './Config';

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
      <Fragment>
        <Routes>

          <Route
            path="/"
            element={
              <Home />
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
            path='*'
            element={<Error404 />}
          />
        </Routes>

      </Fragment>
      
      <Footer />
    </>
  )
}

export default App;