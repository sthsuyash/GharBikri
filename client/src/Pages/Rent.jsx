import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import PropertyCard from "../components/Card/propertyCard";
import MiniNav from "../components/MiniNav/MiniNav";

export default function Rent() {
    useEffect(() => {
        document.title = "Rental Listings | GharBikri";
    }, []);

    const [user, setUser] = useState({
        user_id: "",
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`${SERVER_URL}/api/dashboard`, {
            headers: { token: localStorage.token }
        });
        setUser(result.data);
    };


    const [rentProperties, setRentProperties] = useState([]);

    const getRentProperties = async () => {
        try {
            // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
            let user_id = user.user_id;
            const res = await axios.get(`${SERVER_URL}/api/properties/rent`);
            setRentProperties(res.data.property);
        } catch (error) {
            console.log(error);
        }
    }

    const shouldFetch = useRef(true); // to prevent infinite loop
    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        getRentProperties();
    }, []);

    return (
        <>
            <div className="max-w-[1280px] mx-auto lg:p-6 w-[90%]">
                <MiniNav />
                <h1 className="text-3xl font-semibold text-center lg:text-left my-8 lg:text-5xl">Rental Listings</h1>
                <main className="w-full flex lg:mt-10">
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full p-6 max-w-full space-y-8 bg-white text-gray-600 sm:p-0">
                            {rentProperties ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:mx-0 mx-8">
                                    {
                                        rentProperties.map((property) => (
                                            <PropertyCard key={property.p_id} property={property} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="text-center text-2xl font-bold text-gray-400 mb-10">No properties found</div>)
                            }
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
