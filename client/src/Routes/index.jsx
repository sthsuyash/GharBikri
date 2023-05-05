import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// components
import Home from '../Pages/Home';
import About from '../Pages/About'
import Contact from '../Pages/Contact'

// pages
import DashBoard from '../Pages/DashBoard'
import EditUser from '../Pages/EditUser'
import EditProperty from '../Pages/EditProperty'

import Rent from '../Pages/Rent'
import Buy from '../Pages/Buy'
import Sell from '../Pages/Sell'
import Error404 from '../Pages/Error404'

import PropertyDetails from '../Pages/PageDetails';


function AppRoutes({ setAuth, isAuthenticated }) {

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
                path="/dashboard"
                element={
                    <DashBoard setAuth={setAuth} />
                }
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
                    <Sell />
                }
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
                    <EditUser />
                }
            />

            <Route
                path="/dashboard/editproperty/:id"
                element={
                    <EditProperty />
                }
            />

        </Routes>
    );
}

export default AppRoutes;