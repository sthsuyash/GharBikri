import React, { useEffect, useState } from 'react'
import './App.scss'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { SERVER_URL } from './Config';

// components
import Nav from './Layouts/Header/Nav'
import Footer from './Layouts/Footer/Footer'

import AppRoutes from './Routes'

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
    <div>
      <Nav setAuth={setAuth} isAuthenticated={isAuthenticated} />
      <ToastContainer />
      <AppRoutes setAuth={setAuth} isAuthenticated={isAuthenticated} />
      <Footer setAuth={setAuth} isAuthenticated={isAuthenticated} />
    </div>
  )
}

export default App;