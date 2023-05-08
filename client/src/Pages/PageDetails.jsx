import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import MiniNav from "../components/MiniNav/MiniNav";
import { PencilIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function PageDetails() {

    const { id } = useParams();

    const [properties, setProperties] = useState({
        p_name: "",
        p_address_street_num: "",
        p_address_street_name: "",
        p_address_city: "",
        p_address_state: "",
        p_description: "",
        p_type: "",
        p_bed: "",
        p_bath: "",
        user_id: "",
        p_area_sq_ft: "",
        p_repair_quality: "",
        p_year: "",
        p_price: "",
        p_listingType: "",
        p_availability_status: "",
        p_frontal_image: "",
        created_at: "",
        updated_at: "",
        p_views: "",
        owner_first_name: "",
        owner_last_name: "",
        owner_email: "",
        owner_phone_number: ""
    });

    const fetchProperty = async () => {
        const result = await axios.get(`${SERVER_URL}/api/dashboard/property/${id}`, {
            headers: { token: localStorage.token }
        });
        setProperties(result.data);
        // console.log(result.data);
    };


    const shouldFetch = useRef(true); // to prevent infinite loop
    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        fetchProperty();
    }, []);

    // destructuring properties
    let {
        p_name,
        p_address_street_num,
        p_address_street_name,
        p_address_city,
        p_address_state,
        p_description,
        p_type,
        p_bed,
        p_bath,
        p_area_sq_ft,
        p_repair_quality,
        p_year,
        p_price,
        p_listingType,
        p_availability_status,
        p_frontal_image,
        created_at,
        updated_at,
        p_views,
        owner_id,
        owner_first_name,
        owner_last_name,
        owner_email,
        owner_phone_number
    } = properties;

    created_at = new Date(created_at).toLocaleDateString();
    updated_at = new Date(updated_at).toLocaleDateString();

    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        document.title = `${p_name} Details`;
    }, [properties]);

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

    const deleteProperty = async () => {
        try {
            await axios.delete(`${SERVER_URL}/api/dashboard/property/${properties.p_id}`, {
                headers: { token: localStorage.token }
            });
            // refresh page
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="max-w-[1280px] mx-auto lg:p-6 w-[90%]">
                <MiniNav />
                <h1 className="text-3xl font-semibold text-center lg:text-left my-8 lg:text-5xl">{p_name}</h1>
                <p className="text-center lg:text-left text-gray-500 text-sm mb-8">Last updated on {updated_at}</p>
                <div>

                    <div className="px-4 sm:px-0">
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Property details.</p>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <img src={`/src/assets/uploads/${p_frontal_image}`} alt={`${p_name}`} className="w-full h-96 object-cover rounded-3xl" />
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_address_street_num} {p_address_street_name} • {p_address_city} • {p_address_state}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_description}</dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Posted Date</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{created_at}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Views</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_views}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Repair Quality</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_repair_quality}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                {p_availability_status ? (
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row items-center"><CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" color="green" />Available</dd>) : (
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row items-center"><XCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" color="red" />Not Available</dd>)}

                            </div>
                        </dl>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Posted By:</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{owner_first_name} {owner_last_name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{owner_email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Contact Phone Number</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{owner_phone_number}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:gap-5">
                    {/* edit button if user is the owner */}
                    {
                        user.user_id === owner_id && (
                            <div className="mt-6 flex flex-col sm:flex-row sm:gap-5">
                                {/* edit user button  */}
                                <div className="py-3 bg-gray-50 text-left">
                                    <Link
                                        to={`/dashboard/editproperty/${id}`}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition duration-150 ease-in-out"
                                    >
                                        <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Edit Property
                                    </Link>
                                </div>
                                <div className="py-3 bg-gray-50 text-left">
                                    <button
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-700 transition duration-150 ease-in-out"
                                        id="deleteButton"
                                        data-modal-toggle="deleteModal"
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this property?")) {
                                                deleteProperty();
                                            }
                                        }}
                                    >
                                        <MdDeleteForever className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Delete Property
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            </div>


        </>
    );
}