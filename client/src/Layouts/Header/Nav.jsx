import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dialog, Popover } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/Images/GharBikri-logo.png";
import { toastSuccess } from "../../components/Toast";
import Profile from "../Header/Avatar";
import axios from "axios";
import { FcUnlock, FcSettings, FcLike } from "react-icons/fc";
import { SERVER_URL } from "../../Config";

function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const refreshPage = () => {
        navigate("/", { replace: true });
        window.location.reload();
    };

    const logout = async (e) => {
        e.preventDefault();
        axios.get(`${SERVER_URL}/api/auth/logout`);
        await localStorage.removeItem("token");
        toastSuccess("Logged out Successfully");
        setTimeout(() => {
            refreshPage();
        }, 2000);
    };

    return (
        <header className="bg-white sticky top-0 z-10 shadow-lg">
            <nav className="mx-auto flex max-w-full items-center justify-between py-6 lg:px-16 px-4 md:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">GharBikri</span>
                        <img className="h-10 w-auto" src={logo} alt="GharBikri" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Link to="/rent" className={`transition-all text-2xl font-extrabold leading-6 text-gray-900  hover:text-blue-600 ${location.pathname === "/rent" ? "underline" : ""}`}>
                        Rent
                    </Link>
                    <Link to="/buy" className={`transition-all text-2xl font-bold leading-6 text-gray-900  hover:text-blue-600 ${location.pathname === "/buy" ? "underline" : ""}`}>
                        Buy
                    </Link>
                    <Link to="/sell" className={`transition-all text-2xl font-bold leading-6 text-gray-900  hover:text-blue-600 ${location.pathname === "/sell" ? "underline" : ""}`}>
                        Sell
                    </Link>
                </Popover.Group>

                {/* check if logged in or not, if logged in then render logout button, else render login and register  */}
                {localStorage.getItem("token") ? (
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div className="relative inline-block text-left pr-5">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="cursor-pointer">
                                    <Profile textSizeRatio={2.5} classname={"rounded-full"} size={45} />
                                </label>
                                <ul tabIndex={0} className="transition-all dropdown-content menu py-2 px-2 border shadow-lg rounded-lg bg-white">
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
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                        <div className="relative inline-block text-left pr-5">
                            <Link to="/login"
                                className="text-blue-600 inline-flex justify-center w-full px-4 py-3 text-md font-medium hover:text-gray-950 hover:font-bold hover:underline">
                                Login
                            </Link>
                        </div>

                        <div className="relative inline-block text-left ">
                            <Link to="/register">
                                <button
                                    type="button"
                                    className="transition-all inline-flex justify-center w-full border border-gray-300 shadow-sm px-4 py-3 text-md font-medium text-gray-50 hover:bg-gray-50 hover:text-blue-600  bg-blue-600 hover:font-bold"
                                    id="options-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                >
                                    Register Now
                                </button>
                            </Link>

                        </div>

                    </div>
                )}
            </nav>

            {/* for small screen */}

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Rent
                                </a>
                                <a
                                    href="/buy"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Buy
                                </a>
                                <a
                                    href="/sell"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Sell
                                </a>

                            </div>
                            <div className="py-6">
                                <a
                                    href="/dashboard"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Profile
                                </a>
                                <a
                                    href="/settings"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Settings
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Register
                                </a>

                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}

export default Nav;
