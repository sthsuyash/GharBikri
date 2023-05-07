import React, { useEffect, useState } from 'react';
import axios from "axios";
import { SERVER_URL } from '../Config';
import MiniNav from '../components/MiniNav/MiniNav';

const EditUser = () => {
    // Create a state variable called inputs and a function called setInputs
    const [inputs, setInputs] = useState({
        user_email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        address_city: "",
        address_state: ""
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/dashboard`, {
                headers: { token: localStorage.token }
            });
            const parseRes = res.data;
            setInputs(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    };

    // Destructure the inputs object
    const {
        user_email,
        first_name,
        last_name,
        phone_number,
        address_city,
        address_state
    } = inputs;

    const [inputPassword, setInputPassword] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const onChangePassword = (e) => {
        setInputPassword({
            ...inputPassword,
            [e.target.name]: e.target.value
        });
    };

    const {
        oldPassword,
        newPassword
    } = inputPassword;

    // e is an event object
    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        }); // ...inputs is a spread operator that copies the current state of inputs 
        // console.log(e.target.name, e.target.value)
        // [e.target.name] is a computed property name that will be the name of the input field 
        // e.target.value is the value of the input field
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); // Prevents the default behavior of the browser

        // submit the form data to the server
        try {
            const body = {
                user_email,
                first_name,
                last_name,
                phone_number,
                address_city,
                address_state
            };

            const res = await axios.put(`${SERVER_URL}/api/dashboard`, body, {
                headers: { token: localStorage.token }
            });

            const parseRes = res.data;
            console.log(parseRes);
            window.location = "/dashboard";
        } catch (err) {
            console.error(err.message);
        }
    };

    const onSubmitPassword = async (e) => {
        e.preventDefault(); // Prevents the default behavior of the browser

        // submit the form data to the server
        try {
            const body = {
                oldPassword,
                newPassword
            };

            const res = await axios.put(`${SERVER_URL}/api/dashboard/change-password`, body, {
                headers: { token: localStorage.token }
            });

            const parseRes = res.data;
            console.log(parseRes);
            window.location = "/profile";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <main className="max-w-[1280px] mx-auto lg:p-6 w-[90%] ">
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')"
                }}
            />
            <MiniNav />
            <h1 className="text-3xl font-semibold text-center lg:text-left my-8 lg:text-5xl">Update {first_name} Profile</h1>
            <div className='flex lg:flex-row flex-col gap-10'>

                <div className='lg:w-1/2'>

                    <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">

                        {/* user form  */}
                        <form
                            onSubmit={(e) => onSubmitForm(e)}
                            className="space-y-5"
                        >
                            <div className='flex lg:flex-row gap-5 flex-col'>

                                {/* first_name */}
                                <div>
                                    <label className="font-medium">
                                        First Name
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input
                                            name="first_name"
                                            type="text"
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                            placeholder="John"
                                            value={first_name}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                </div>

                                {/* last_name */}
                                <div>
                                    <label className="font-medium">
                                        Last Name
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input
                                            name="last_name"
                                            type="text"
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                            placeholder="Smith"
                                            value={last_name}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* email */}
                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input
                                        name="user_email"
                                        type="email"
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                        placeholder="sammy12@gmail.com"
                                        value={user_email}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>

                            {/* phone */}
                            <div>
                                <label className="font-medium">
                                    Phone Number
                                </label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-phone-outline text-gray-400 text-lg"></i></div>
                                    <input
                                        name="phone_number"
                                        type="phone_number"
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                        value={phone_number}
                                        onChange={(e) => onChange(e)}
                                        placeholder='9841234567'
                                    />
                                </div>
                            </div>

                            {/* address */}
                            <div className='flex flex-col lg:flex-row gap-x-5'>
                                {/* address_city */}
                                <div>
                                    <label className="font-medium">
                                        City
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-map-marker-outline text-gray-400 text-lg"></i></div>
                                        <input
                                            name="address_city"
                                            type="address_city"
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200 "
                                            value={address_city}
                                            onChange={(e) => onChange(e)}
                                            placeholder='Kathmandu'
                                        />
                                    </div>
                                </div>

                                {/* address_state */}
                                <div>
                                    <label className="font-medium">
                                        State
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-map-marker-outline text-gray-400 text-lg"></i></div>
                                        <input
                                            name="address_state"
                                            type="address_state"
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                            value={address_state}
                                            onChange={(e) => onChange(e)}
                                            placeholder='Bagmati'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* submit the form */}
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-600 rounded-lg duration-150"
                                type="submit"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>

                {/* change password  */}
                <div className="flex-1 flex items-center justify-center bg-white rounded-lg ">
                    <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                        <div className="">
                            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Change Password</h1>
                        </div>
                        <div className="mt-4">
                            <form
                                onSubmit={(e) => onSubmitPassword(e)}
                            >
                                {/* old password */}
                                <div className='mb-10'>
                                    <label className="font-medium">
                                        Old Password
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input
                                            name="oldPassword"
                                            type="password"
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                            placeholder="************"
                                            value={oldPassword}
                                            onChange={(e) => onChangePassword(e)}
                                        />
                                    </div>
                                </div>

                                {/* new password */}
                                <div className='mb-10'>
                                    <label className="font-medium">
                                        New Password
                                    </label>

                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input
                                            name="newPassword"
                                            type="password"
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                            placeholder="************"
                                            value={newPassword}
                                            onChange={(e) => onChangePassword(e)}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="w-full px-4 py-2 text-white font-medium bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-600 rounded-lg duration-150"
                                    type="submit"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default EditUser;