import image from '../assets/Images/bg.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../Layouts/Header/Avatar"
import PropertyCard from "../components/Card/propertyCard";
import { SERVER_URL } from "../Config/index.js";
import { Link } from "react-router-dom";
import MiniNav from '../components/MiniNav/MiniNav';

function Dashboard() {

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        user_email: "",
        phone_number: "",
        address_city: "",
        address_state: "",
        created_at: "",
        updated_at: "",
        property_count: ""
    });

    useEffect(() => {
        loadUser();
    }, []);

    user.created_at = new Date(user.created_at).toLocaleDateString();
    user.updated_at = new Date(user.updated_at).toLocaleDateString();

    // load user who is logged in
    const loadUser = async () => {
        const result = await axios.get("http://localhost:3000/api/dashboard", {
            headers: { token: localStorage.token }
        });
        setUser(result.data);
    };

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadProperties();
    }, []);

    // load properties of user who is logged in
    const loadProperties = async () => {
        const result = await axios.get(`${SERVER_URL}/api/dashboard/get-user-properties`, {
            headers: { token: localStorage.token }
        });
        // console.log(result.data);
        setProperties(result.data);
    };

    // const [rentProperties, setRentProperties] = useState([]);


    return (
        <>
            <main className="max-w-[1280px] mx-auto lg:p-6 w-[90%]">
                <MiniNav />
                <h1 className="text-3xl font-semibold text-center lg:text-left my-8 lg:text-5xl">Properties Listed</h1>
                <div className="lg:p-20 lg:rounded-3xl bg-gray-100 py-16">

                    {properties ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:mx-0 mx-8">
                                {
                                    properties.map((property) => (
                                        <PropertyCard key={property.p_id} property={property} />
                                    ))
                                }
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-2xl font-bold text-gray-400 mb-10">No properties found</div>)
                    }


                </div>
            </main>
        </>
    );
}

export default Dashboard;
