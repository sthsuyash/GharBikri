import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { toastSuccess, toastError } from '../components/Toast'
import { registerValidate } from '../Middleware/registerValidation';
import { SERVER_URL } from '../Config';

const RegisterPage = ({ setAuth }) => {
    // Create a state variable called inputs and a function called setInputs
    const [inputs, setInputs] = useState({
        user_email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone_number: "",
        address_city: "",
        address_state: ""
    });

    // error state
    const [error, setError] = useState(
        {
            user_email: "",
            first_name: "",
            last_name: "",
            password: "",
            phone_number: "",
            address_city: "",
            address_state: ""
        }
    );

    // Destructure the inputs object
    const { user_email, first_name, last_name, password, phone_number, address_city, address_state } = inputs;

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

        const errors = registerValidate(inputs);
        setError(
            {
                user_email: errors.user_email,
                first_name: errors.first_name,
                last_name: errors.last_name,
                password: errors.password,
                phone_number: errors.phone_number,
                address_city: errors.address_city,
                address_state: errors.address_state
            }
        );

        // console.log(Object.keys(error).length);

        if (Object.keys(errors).length === 0) {
            try {
                const body = { user_email, first_name, last_name, password, phone_number, address_city, address_state };
                const response = await axios.post(`${SERVER_URL}/api/auth/register`, body);
                const parseRes = response.data;

                if (parseRes.token) {
                    localStorage.setItem("token", parseRes.token);
                    setAuth(true);
                    toastSuccess('Registered successfully!');
                    // console.log("Registered successfully!");
                } else {
                    setAuth(false);
                }
            } catch (err) {
                if (err.response.status === 422) {
                    const errors = err.response.data.errors;
                    const errorMessage = errors.map((error) => error.msg).join(" & ");
                    console.log(errorMessage)
                    toastError(errorMessage);
                }
            }
        }
        else {
            // if all fields are empty, display error message
            if (!user_email && !first_name && !last_name && !password && !phone_number && !address_city && !address_state) {
                toastError('All fields are required!');
            }
            else {
                const errorMessages = Object.values(errors).filter(error => error !== null && error !== undefined);
                errorMessages.forEach(error => toastError(error));
            }
        }
    };

    return (
        <main className="w-full flex">
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')"
                }}
            />
            <div className="relative flex-1 hidden items-center justify-center bg-white lg:flex h-screen max-h-[2000px]">
                <div className="relative z-10 w-full max-w-md">
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-3xl font-bold text-center text-green-100">Start your search for new home today</h3>
                        <h3 className="text-5xl font-bold text-center text-green-200">or</h3>
                        <h3 className="text-3xl font-bold text-center text-green-200">add your houses</h3>
                        <p className="text-yellow-100">
                            Create an account and get access to all features for free.
                        </p>
                        <div className="flex items-center -space-x-2 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-teal-700" />
                            <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full border-2 border-teal-700" />
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full border-2 border-teal-700" />
                            <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full border-2 border-teal-700" />
                            <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" className="w-10 h-10 rounded-full border-2 border-teal-700" />
                            <p className="text-sm font-medium translate-x-5 text-yellow-100">
                                Join 5.000+ users
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-0 my-auto -mt-10"
                    style={{
                        backgroundImage: `url(${})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: "contrast(1.3) brightness(0.5)",
                    }}
                >

                </div>
            </div>

            <div className="flex-1 flex items-center justify-center bg-white rounded-lg">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                        <p className='lg:text-lg text-sm'>Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
                    </div>

                    {/* main form */}
                    <form
                        onSubmit={onSubmitForm}
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
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                        placeholder="John"
                                        value={first_name}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                {error.first_name && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.first_name}
                                    </p>
                                )}
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
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                        placeholder="Smith"
                                        value={last_name}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                {error.last_name && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.last_name}
                                    </p>
                                )}
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
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                    placeholder="sammy12@gmail.com"
                                    value={user_email}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            {/* text that shows up when validation error */}
                            {error.user_email && (
                                <p className="text-red-500 text-xs italic">
                                    {error.user_email}
                                </p>
                            )}
                        </div>


                        {/* password */}
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input
                                    name="password"
                                    type="password"
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                    placeholder="************"
                                    value={password}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            {error.password && (
                                <p className=" text-red-500 text-xs italic">
                                    {error.password}
                                </p>
                            )}
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
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                    value={phone_number}
                                    onChange={(e) => onChange(e)}
                                    placeholder='9841234567'
                                />
                            </div>
                            {error.phone_number && (
                                <p className=" text-red-500 text-xs italic">
                                    {error.phone_number}
                                </p>
                            )}
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
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200 "
                                        value={address_city}
                                        onChange={(e) => onChange(e)}
                                        placeholder='Kathmandu'
                                    />
                                </div>
                                {error.address_city && (
                                    <p className=" text-red-500 text-xs italic">
                                        {error.address_city}
                                    </p>
                                )}
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
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                        value={address_state}
                                        onChange={(e) => onChange(e)}
                                        placeholder='Bagmati'
                                    />
                                </div>
                                {error.address_state && (
                                    <p className=" text-red-500 text-xs italic">
                                        {error.address_state}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* submit the form */}
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            type="submit"
                        >
                            Create account
                        </button>
                        <ToastContainer />

                        {/* continue with google */}
                        <div className="mt-5">
                            <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
                                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_17_40)">
                                        <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                        <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                        <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                        <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_17_40">
                                            <rect width="48" height="48" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}

export default RegisterPage;