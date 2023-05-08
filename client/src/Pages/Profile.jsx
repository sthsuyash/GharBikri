import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import MiniNav from "../components/MiniNav/MiniNav";
import { PencilIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";


export default function Profile() {

    const [user, setUser] = useState({
        user_id: "",
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
        const result = await axios.get(`${SERVER_URL}/api/dashboard`, {
            headers: { token: localStorage.token }
        });
        setUser(result.data);
    };

    useEffect(() => {
        document.title = "Profile";
    }, []);

    const deleteUser = async () => {
        await axios.delete(`${SERVER_URL}/api/dashboard`, {
            headers: { token: localStorage.token }
        });
        // remove the token and redirect to home page
        localStorage.removeItem("token");
        window.location = "/";
    };

    return (
        <>
            <div className="max-w-[1280px] mx-auto lg:p-6 w-[90%]">
                <MiniNav />
                <h1 className="text-3xl font-semibold text-center lg:text-left my-8 lg:text-5xl">{user.first_name}&apos;s Profile</h1>

                <div>

                    <div className="px-4 sm:px-0">
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.first_name} {user.last_name} </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.user_email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.phone_number}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Total Properties</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.property_count}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.address_city}, {user.address_state} </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Joined Date</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.created_at}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Last Updated</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.updated_at}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:gap-5">
                    {/* edit user button  */}
                    <div className="py-3 bg-gray-50 text-left">
                        <Link
                            to={`/profile/edit`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition duration-150 ease-in-out"
                        >
                            <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Edit Profile
                        </Link>
                    </div>
                    <div className="py-3 bg-gray-50 text-left">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-700 transition duration-150 ease-in-out"
                            id="deleteButton"
                            data-modal-toggle="deleteModal"
                            type="button"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete your account?")) {
                                    deleteUser();
                                }
                            }}
                        >
                            <MdDeleteForever className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Delete User
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}