import React from 'react';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from '../Pages/Home';
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Profile from '../Pages/Profile'
import DashBoard from '../Pages/DashBoard'
import EditUser from '../Pages/EditUser'
import EditProperty from '../Pages/EditProperty'
import Rent from '../Pages/Rent'
import Buy from '../Pages/Buy'
import Sell from '../Pages/Sell'
import Error404 from '../Pages/Error404'
import PropertyDetails from '../Pages/PageDetails';
import Favourites from '../Pages/Favourites';


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
                path="/profile"
                element={
                    <Profile />
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
                path="/profile/edit"
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

            <Route
                path="/favourites"
                element={
                    <Favourites />
                }
            />
        </Routes>
    );
}

export default AppRoutes;