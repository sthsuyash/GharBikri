import image from '../assets/Images/bg.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../Layouts/Header/Avatar"
import PropertyCard from "../components/Card/propertyCard";
import { SERVER_URL } from "../Config/index.js";
import { Link } from "react-router-dom";

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

    const deleteUser = async () => {
        await axios.delete(`http://localhost:3000/api/dashboard`, {
            headers: { token: localStorage.token }
        });
        // remove the token and redirect to home page
        localStorage.removeItem("token");
        window.location = "/";
    };


    return (
        <main className="">
            <section className="relative block h-[600px]">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${image})`
                    }}
                >
                    <span
                        id="blackOverlay"
                        className="w-full h-full absolute opacity-50 bg-black"
                    />
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style={{ transform: "translateZ(0px)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x={0}
                        y={0}
                    >
                        <polygon
                            className="text-blueGray-200 fill-current"
                            points="2560 0 2560 100 0 100"
                        />
                    </svg>
                </div>
            </section>
            <section className="relative bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-0">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <div className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-20 lg:-ml-20 max-w-150-px">
                                            <Profile
                                                size={150}
                                                textSizeRatio={2}
                                                classname={"rounded-full"}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-sm text-blueGray-400">Joined Date: </span>
                                            <span className="text-xl font-bold inline uppercase tracking-wide text-blueGray-600">
                                                {user.created_at}
                                            </span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-sm text-blueGray-400">Updated Profile: </span>
                                            <span className="text-xl font-bold inline uppercase tracking-wide text-blueGray-600">
                                                {user.updated_at}
                                            </span>
                                        </div>

                                    </div>
                                </div>



                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                {user.property_count}
                                            </span>
                                            <span className="text-sm text-blueGray-400">Property Listed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                                    {user.first_name} {user.last_name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                                    {user.address_city}, {user.address_state}
                                </div>
                                {/* phone number */}
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-phone mr-2 text-lg text-blueGray-400" />
                                    {user.phone_number}
                                </div>
                                {/* email */}
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400" />
                                    {user.user_email}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">

                                    <div className="mx-auto max-w-full px-4 lg:px-24 md:px-8 md:flex-row flex lg:flex-row flex-wrap my-0 justify-normal">
                                        <h2 className="text-6xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl sm:mb-5 sm:mx-6">
                                            Properties Listed
                                        </h2>
                                    </div>

                                    <div className="flex flex-col gap-20 py-14">
                                        <div className="">
                                            <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-3 justify-start md:grid-cols-2">
                                                {properties.map((property) => (
                                                    <PropertyCard key={property.p_id} property={property} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex lg:flex-row flex-col items-center justify-center gap-10">
                                {/* edit user button */}
                                <div className="flex">
                                    <Link
                                        to={`/dashboard/edituser/${user.user_id}`}
                                        className="bg-blue-700 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-white hover:text-blue-800 border"
                                    >
                                        Edit Profile
                                    </Link>
                                </div>

                                {/* delete user button */}
                                <div className="flex">
                                    <button
                                        className="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-white hover:text-red-600 border"
                                        type="button"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "Are you sure you wish to delete your profile? This action cannot be undone."
                                                )
                                            )
                                                deleteUser();
                                        }}
                                    >
                                        Delete Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
