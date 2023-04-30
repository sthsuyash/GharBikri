import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
// components
import Home from '../Pages/Home';
import About from '../Pages/About'
import Contact from '../Pages/Contact'

// pages
import LoginPage from '../Pages/LoginPage'
import RegisterPage from '../Pages/RegisterPage'
import DashBoard from '../Pages/DashBoard'

import EditUser from '../Pages/EditUser'
import EditProperty from '../Pages/EditProperty'

import Rent from '../Pages/Rent'
import Buy from '../Pages/Buy'
import Sell from '../Pages/Sell'
import Error404 from '../Pages/Error404'

import PropertyDetails from '../Pages/PageDetails';

import { SERVER_URL } from '../Config';

function AppRoutes() {

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
        <Routes>
            <Route path="*" element={<Error404 />} />

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
                path='/sell'
                element={
                    isAuthenticated ? (<Sell />
                    ) : (
                        <Navigate replace to="/login" />
                    )}
            />


            <Route
                path="/property/:id"
                element={
                    // pass id to the property details page to fetch data from backend
                    <PropertyDetails />
                }
            />

            {/* // TODO : add user profile visit page  */}

            <Route
                path="/about"
                element={
                    <About />
                }
            />

            <Route
                path="/contact"
                element={
                    <Contact />
                }
            />

            <Route
                path="/dashboard/edituser/:id"
                element={
                    isAuthenticated ? (<EditUser />
                    ) : (
                        <Navigate replace to="/login" />
                    )}
            />

            <Route
                path="/dashboard/editproperty/:id"
                element={
                    isAuthenticated ? (<EditProperty setAuth={setAuth} />
                    ) : (
                        <Navigate replace to="/login" />
                    )}
            />

        </Routes>
    );
}

export default AppRoutes;