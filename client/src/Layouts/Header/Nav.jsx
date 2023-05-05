import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dialog, Popover } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/Images/GharBikri-logo.png";
import Profile from "../Header/Avatar";
import axios from "axios";
import { FcUnlock, FcSettings, FcLike } from "react-icons/fc";
import { SERVER_URL } from "../../Config";

import { toastSuccess, toastError } from "../../components/Toast";
import { loginValidate } from "../../Middleware/loginValidation";
import { registerValidate } from "../../Middleware/registerValidation";

function Nav({ setAuth, isAuthenticated }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const refreshPage = () => {
        navigate("/", { replace: true });
        window.location.reload();
    };

    // error state
    const [error, setError] = useState({});

    // inputs state
    const [inputs, setInputs] = useState({
        user_email: "",
        password: "",
    });

    // Destructure the inputs object
    const { user_email, password } = inputs;

    // e is the event object
    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const error = loginValidate(inputs);

        if (error) {
            setError(error);
        }

        if (Object.keys(error).length === 0) {
            try {
                const body = { user_email, password };
                const response = await axios.post(`${SERVER_URL}/api/auth/login`, body);
                const parseRes = response.data;

                if (parseRes.token) {
                    localStorage.setItem("token", parseRes.token); // localStorage is a browser API that stores data with no expiration
                    setAuth(true);
                    setShowModal(false);
                    toastSuccess("Logged in successfully!");
                    setTimeout(() => {
                        refreshPage();
                    }, 2000);
                    loadUser();
                    // console.log("Logged in successfully!");
                    // close the modal
                } else {
                    setAuth(false);
                }
            } catch (err) {
                console.error(err.message);
                if (err.response.status === 422) {
                    let errors = (err.response.data.errors[0].msg)
                    console.log(errors)
                    toastError(errors);
                } else {
                    toastError("Server error!");

                }
            }
        } else {
            const errorMessages = Object.values(error).filter(errors => errors !== null && errors !== undefined);
            errorMessages.forEach(error => toastError(error));
        }
    };

    const [showModal, setShowModal] = useState(false);

    const [showRegisterModal, setShowRegisterModal] = useState(false);



    const logout = async (e) => {
        e.preventDefault();
        axios.get(`${SERVER_URL}/api/auth/logout`);
        await localStorage.removeItem("token");
        toastSuccess("Logged out Successfully");
        setTimeout(() => {
            refreshPage();
        }, 2000);
    };

    const [user, setUser] = useState({
        user_email: "",
    });

    const loadUser = async () => {
        const result = await axios.get(`${SERVER_URL}/api/dashboard`, {
            headers: { token: localStorage.token },
        });
        setUser(result.data);
    };

    useEffect(() => {
        loadUser();
    }, [user]);

    // Create a state variable called registerInputs and a function called setInputs
    const [registerInputs, setregisterInputs] = useState({
        register_user_email: "",
        register_first_name: "",
        register_last_name: "",
        register_password: "",
        register_phone_number: "",
        register_address_city: "",
        register_address_state: ""
    });

    // registerError state
    const [registerError, setregisterError] = useState(
        {
            register_user_email: "",
            register_first_name: "",
            register_last_name: "",
            register_password: "",
            register_phone_number: "",
            register_address_city: "",
            register_address_state: ""
        }
    );

    // Destructure the registerInputs object
    const {
        register_user_email,
        register_first_name,
        register_last_name,
        register_password,
        register_phone_number,
        register_address_city,
        register_address_state
    } = registerInputs;

    // e is an event object
    const onRegisterChange = (e) => {
        setregisterInputs({
            ...registerInputs,
            [e.target.name]: e.target.value
        }); // ...registerInputs is a spread operator that copies the current state of registerInputs 
        // console.log(e.target.name, e.target.value)
        // [e.target.name] is a computed property name that will be the name of the input field 
        // e.target.value is the value of the input field
    };

    const onSubmitRegisterForm = async (e) => {
        e.preventDefault(); // Prevents the default behavior of the browser

        const registerErrors = registerValidate(registerInputs);
        setregisterError(
            {
                register_user_email: registerErrors.register_user_email,
                register_first_name: registerErrors.register_first_name,
                register_last_name: registerErrors.register_last_name,
                register_password: registerErrors.register_password,
                register_phone_number: registerErrors.register_phone_number,
                register_address_city: registerErrors.register_address_city,
                register_address_state: registerErrors.register_address_state
            }
        );

        // console.log(Object.keys(registerError).length);

        if (Object.keys(registerErrors).length === 0) {
            try {
                const body = {
                    user_email: register_user_email,
                    first_name: register_first_name,
                    last_name: register_last_name,
                    password: register_password,
                    phone_number: register_phone_number,
                    address_city: register_address_city,
                    address_state: register_address_state
                };
                const response = await axios.post(`${SERVER_URL}/api/auth/register`, body);
                const parseRes = response.data;

                if (parseRes.token) {
                    localStorage.setItem("token", parseRes.token);
                    setAuth(true);
                    toastSuccess('Registered successfully!');
                    // console.log("Registered successfully!");
                    // close the modal
                    setShowRegisterModal(false);
                    setTimeout(() => {
                        refreshPage();
                    }, 2000);
                } else {
                    setAuth(false);
                }
            } catch (err) {
                if (err.response.status === 422) {
                    const registerErrors = err.response.data.registerErrors;
                    const registerErrorMessage = registerErrors.map((registerError) => registerError.msg).join(" & ");
                    console.log(registerErrorMessage)
                    toastError(registerErrorMessage);
                }
            }
        }
        else {
            // if all fields are empty, display registerError message
            if (!register_user_email && !register_first_name && !register_last_name && !register_password && !register_phone_number && !register_address_city && !register_address_state) {
                toastError('All fields are required!');
            }
            else {
                const registerErrorMessages = Object.values(registerErrors).filter(registerError => registerError !== null && registerError !== undefined);
                registerErrorMessages.forEach(registerError => toastError(registerError));
            }
        }
    };

    return (
        <header className="p-6 max-w-[1280px] mx-auto">
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')"
                }}
            />

            {/* login modal  */}
            {showModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto" >
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* overlay */}
                        <div className="fixed inset-0 transition-opacity" onClick={() => { setShowModal(false) }}>
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full pb-6">

                            <div className="flex-1 flex items-center justify-center bg-white  rounded-lg p-6">
                                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-00 sm:px-0">
                                    <div className="mt-5 space-y-2">
                                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login to your account</h3>
                                        <p>
                                            Don&apos;t have an account?&nbsp;
                                            <button
                                                className="font-medium text-cyan-500 hover:text-cyan-600"
                                                onClick={() => { setShowRegisterModal(true); setShowModal(false) }}
                                            > Sign Up
                                            </button>
                                        </p>
                                    </div>

                                    {/* main form */}
                                    <form
                                        onSubmit={onSubmitForm}
                                        className="space-y-5"
                                    >
                                        {/* email */}
                                        <div>
                                            <label className="font-medium">
                                                Email
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-50 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                <input
                                                    name="user_email"
                                                    type="email"
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-00 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                    placeholder="sammy12@gmail.com"
                                                    value={user_email}
                                                    onChange={(e) => onChange(e)}
                                                />
                                            </div>
                                            {/* text that shows up when validation error */}
                                            {error.user_email
                                                && (
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
                                                <div className="w-10 z-50 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-00 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                    placeholder="************"
                                                    value={password}
                                                    onChange={(e) => onChange(e)}
                                                />
                                            </div>
                                            {/* text that shows up when validation error */}
                                            {error.password && (
                                                <p className=" text-red-500 text-xs italic">
                                                    {error.password}
                                                </p>
                                            )}
                                        </div>

                                        {/* submit the form */}
                                        <button
                                            className="w-full px-4 py-2 text-white font-medium bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-00 rounded-lg duration-150"
                                            type="submit"
                                        >
                                            Login
                                        </button>

                                        {/* forgot password */}
                                        <div className="flex items-center justify-between">
                                            <Link to="/forgot-password" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">
                                                Forgot Password?
                                            </Link>
                                        </div>

                                        {/* continue with google */}
                                        <div className="mt-5">
                                            <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
                                                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_17_40)">
                                                        <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                                        <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                                        <path d="M11.0051 28.006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.006Z" fill="#FBBC04" />
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
                        </div>

                    </div>
                </div>
            )}

            {/* register modal */}
            {showRegisterModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto" >
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* overlay */}
                        <div className="fixed inset-0 transition-opacity" onClick={() => { setShowRegisterModal(false) }}>
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>

                        {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203; */}

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full pb-6">
                            <div className="flex-1 flex items-center justify-center bg-white  rounded-lg p-6">
                                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-00 sm:px-0">
                                    <div className="mt-5 space-y-2">
                                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                                        <p className='lg:text-lg text-sm'>Already have an account?&nbsp;
                                            <button
                                                className="font-medium text-cyan-500 hover:text-cyan-600"
                                                onClick={() => { setShowRegisterModal(false); setShowModal(true) }}
                                            >
                                                Log in
                                            </button>
                                        </p>
                                    </div>

                                    {/* main form */}
                                    <form
                                        onSubmit={onSubmitRegisterForm}
                                        className="space-y-5"
                                    >
                                        <div className='flex lg:flex-row gap-5 flex-col'>

                                            {/* register_first_name */}
                                            <div>
                                                <label className="font-medium">
                                                    First Name
                                                </label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                                    <input
                                                        name="register_first_name"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                        placeholder="John"
                                                        value={register_first_name}
                                                        onChange={(e) => onRegisterChange(e)}
                                                    />
                                                </div>
                                                {registerError.register_first_name && (
                                                    <p className="text-red-500 text-xs italic">
                                                        {registerError.register_first_name}
                                                    </p>
                                                )}
                                            </div>

                                            {/* register_last_name */}
                                            <div>
                                                <label className="font-medium">
                                                    Last Name
                                                </label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                                    <input
                                                        name="register_last_name"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                        placeholder="Smith"
                                                        value={register_last_name}
                                                        onChange={(e) => onRegisterChange(e)}
                                                    />
                                                </div>
                                                {registerError.register_last_name && (
                                                    <p className="text-red-500 text-xs italic">
                                                        {registerError.register_last_name}
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
                                                    name="register_user_email"
                                                    type="email"
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                    placeholder="sammy12@gmail.com"
                                                    value={register_user_email}
                                                    onChange={(e) => onRegisterChange(e)}
                                                />
                                            </div>
                                            {/* text that shows up when validation registerError */}
                                            {registerError.register_user_email && (
                                                <p className="text-red-500 text-xs italic">
                                                    {registerError.register_user_email}
                                                </p>
                                            )}
                                        </div>


                                        {/* register_password */}
                                        <div>
                                            <label className="font-medium">
                                                Password
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                                <input
                                                    name="register_password"
                                                    type="password"
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                    placeholder="************"
                                                    value={register_password}
                                                    onChange={(e) => onRegisterChange(e)}
                                                />
                                            </div>
                                            {registerError.register_password && (
                                                <p className=" text-red-500 text-xs italic">
                                                    {registerError.register_password}
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
                                                    name="register_phone_number"
                                                    type="register_phone_number"
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                    value={register_phone_number}
                                                    onChange={(e) => onRegisterChange(e)}
                                                    placeholder='9841234567'
                                                />
                                            </div>
                                            {registerError.register_phone_number && (
                                                <p className=" text-red-500 text-xs italic">
                                                    {registerError.register_phone_number}
                                                </p>
                                            )}
                                        </div>

                                        {/* address */}
                                        <div className='flex flex-col lg:flex-row gap-x-5'>
                                            {/* register_address_city */}
                                            <div>
                                                <label className="font-medium">
                                                    City
                                                </label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-map-marker-outline text-gray-400 text-lg"></i></div>
                                                    <input
                                                        name="register_address_city"
                                                        type="register_address_city"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200 "
                                                        value={register_address_city}
                                                        onChange={(e) => onRegisterChange(e)}
                                                        placeholder='Kathmandu'
                                                    />
                                                </div>
                                                {registerError.register_address_city && (
                                                    <p className=" text-red-500 text-xs italic">
                                                        {registerError.register_address_city}
                                                    </p>
                                                )}
                                            </div>

                                            {/* register_address_state */}
                                            <div>
                                                <label className="font-medium">
                                                    State
                                                </label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center pt-2"><i className="mdi mdi-map-marker-outline text-gray-400 text-lg"></i></div>
                                                    <input
                                                        name="register_address_state"
                                                        type="register_address_state"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-cyan-600 shadow-sm -ml-10 pl-10 pr-3 rounded-lg border-2 border-gray-200"
                                                        value={register_address_state}
                                                        onChange={(e) => onRegisterChange(e)}
                                                        placeholder='Bagmati'
                                                    />
                                                </div>
                                                {registerError.register_address_state && (
                                                    <p className=" text-red-500 text-xs italic">
                                                        {registerError.register_address_state}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* submit the form */}
                                        <button
                                            className="w-full px-4 py-2 text-white font-medium bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-600 rounded-lg duration-150"
                                            type="submit"
                                        >
                                            Create account
                                        </button>

                                        {/*  */}

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <nav className="mx-auto flex items-center justify-between max-w-[1280px] w-[90%]" aria-label="Global">
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-500"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <Popover.Group className="hidden lg:flex lg:gap-x-12 lg:flex-1">
                    <Link to="/rent" className={`transition-all text-md font-semibold leading-6 text-gray-500  hover:text-cyan-600 ${location.pathname === "/rent" ? "underline" : ""}`}>
                        Rent
                    </Link>
                    <Link to="/buy" className={`transition-all text-md font-semibold leading-6 text-gray-500  hover:text-cyan-600 ${location.pathname === "/buy" ? "underline" : ""}`}>
                        Buy
                    </Link>
                    {/* if user is logged in, show sell button */}
                    {localStorage.getItem("token") ?
                        (
                            <Link
                                to="/sell"
                                className={`transition-all text-md font-semibold leading-6 text-gray-500  hover:text-cyan-600 ${location.pathname === "/sell" ? "underline" : ""}`}>
                                Sell
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="transition-all text-md font-semibold leading-6 text-gray-500  hover:text-cyan-600"
                                onClick={() => setShowModal(true)}
                            >
                                Sell
                            </button>
                        )
                    }
                </Popover.Group>

                <div className="flex lg:flex-2">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">GharBikri</span>
                        <img className="h-12 w-auto" src={logo} alt="GharBikri" />
                    </Link>
                </div>

                <div className="hidden lg:flex-1 lg:flex lg:flex-row justify-end space-x-5 mr-5">
                    <Link to="/about">
                        <button
                            type="button"
                            className="flex flex-row items-center gap-1 transition-all font-semibold justify-center text-sm text-gray-500  hover:text-cyan-600"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                        >
                            About
                        </button>
                    </Link>

                    <Link to="/contact">
                        <button
                            type="button"
                            className="flex flex-row items-center gap-1 transition-all font-semibold justify-center text-sm  text-gray-500  hover:text-cyan-600"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                        >
                            Contact Us
                        </button>
                    </Link>
                </div>
                {/* check if logged in or not, if logged in then render logout button, else render login and register  */}
                {localStorage.getItem("token") ? (
                    <div className="hidden md:flex">
                        <div className="relative inline-block text-left">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="cursor-pointer">
                                    <Profile textSizeRatio={2} classname={"rounded-full"} size={40} />
                                </label>
                                {/* show signed in as values */}
                                <ul tabIndex={0} className="mt-2 transition-all dropdown-content menu py-2 px-2 border shadow-lg rounded-lg bg-white text-sm">
                                    <li className="text-sm text-gray-500 cursor-default">
                                        <p className="text-sm">Signed in as</p>
                                        <p className="font-semibold -mt-4">{user.user_email}</p>
                                    </li>
                                    <li className="hover:underline flex flex-row">
                                        <a href="/dashboard"><FcSettings />Profile</a>
                                    </li>
                                    <li className="hover:underline">
                                        <a href="/favourites"><FcLike />Favourites</a>
                                    </li>
                                    <li className="hover:underline flex flex-row">
                                        <Link to="/">
                                            <FcUnlock />
                                            <button
                                                type="button"
                                                className="transition-all font-semibold justify-center shadow-sm text-md  text-red-500  hover:text-red-500  hover:font-bold hover:underline"
                                                aria-haspopup="true"
                                                aria-expanded="true"
                                                onClick={(e) => { logout(e) }}
                                            >
                                                Logout
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="rounded-full bg-cyan-600 p-2 hover:cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        {/* svg for profile  */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 rounded-full"
                            viewBox="0 0 20 20"
                            fill="white"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 2a4 4 0 100 8 4 4 0 000-8zM5.5 6a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM10 13c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}
            </nav>

            {/* for small screen */}

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">GharBikri</span>
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt="logo"
                            />
                        </Link>

                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-500"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="/rent"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                >
                                    Rent
                                </a>
                                <a
                                    href="/buy"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                >
                                    Buy
                                </a>
                                {/*  if logged in then go to sell else open login modal */}
                                {localStorage.getItem("token") ? (
                                    <a
                                        href="/sell"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                    >
                                        Sell
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                        onClick={() => { setShowModal(true); setMobileMenuOpen(false) }}
                                    >
                                        Sell
                                    </button>
                                )}
                                <hr className="my-2" />
                                <a
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                >
                                    About
                                </a>
                                <a
                                    href="/contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                >
                                    Contact
                                </a>
                            </div>
                            {localStorage.getItem("token") ? (
                                <div className="py-6">
                                    <hr className="" />
                                    <a
                                        href="/dashboard"
                                        className="flex flex-row gap-x-1 items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                    >
                                        <FcSettings />Profile
                                    </a>
                                    <a
                                        href="/favourites"
                                        className="flex flex-row gap-x-1 items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                    >
                                        <FcLike />Favourites
                                    </a>
                                    <button
                                        onClick={(e) => { logout(e) }}

                                        className="flex flex-row gap-x-1 items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                    >
                                        <FcUnlock />Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="py-6">
                                    <button
                                        type="button"
                                        className="flex flex-row gap-x-1 items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                                        onClick={() => { setShowModal(true); setMobileMenuOpen(false) }}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}

export default Nav;
