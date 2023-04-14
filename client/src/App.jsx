import { Fragment, useState, useEffect } from 'react'
import './App.scss'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, Routes } from 'react-router-dom'

// components
import Header from './Layouts/Header/Header'
import Home from './Pages/Home'
import Footer from './Layouts/Footer/Footer'

// pages
import Login from './Pages/LoginPage'
import Register from './Pages/RegisterPage'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("https://localhost:3000/api/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
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
      <ToastContainer />
      <Header />

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
              !isAuthenticated ? (<Login setAuth={setAuth} />
              ) : (
                <Navigate replace to="/" />
              )}
          />

          <Route
            path="/register"
            element={
              !isAuthenticated ? (<Register setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )}
          />
        </Routes>

      </Fragment>
      <Footer />
    </>
  )
}

export default App;