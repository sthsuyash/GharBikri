import React from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const MiniNav = () => {
    // break down page location into array
    const pagelocation = window.location.pathname.split("/");
    // console.log(pagelocation)


    return (
        <div className="lg:mb-20 lg:px-0 mb-10">
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <button className="border-[2px] font-semibold  border-gray-300 rounded-full py-[10px] px-4  text-black hover:border-black text-sm hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
                            <Link to="/" className="flex justify-center items-center gap-2">
                                <AiOutlineLeft />
                                <span>Go Home</span>
                            </Link>
                        </button>
                    </div>
                    <div>
                        <ol
                            className="flex items-center whitespace-nowrap min-w-0"
                            aria-label="Breadcrumb"
                        >
                            <li className="text-sm">
                                <Link
                                    className="flex items-center text-gray-500 hover:text-cyan-600"
                                    to={"/"}
                                >
                                    Home
                                    <AiOutlineRight className="flex-shrink-0 mx-3 h-2.5 w-2.5 text-gray-600 dark:text-gray-600" />
                                </Link>
                            </li>
                            {
                                pagelocation.map((page, index) => {
                                    if (page !== "") {
                                        page = page.charAt(0).toUpperCase() + page.slice(1);
                                        return (
                                            <li className="text-sm" key={index}>
                                                <Link
                                                    className="flex items-center text-gray-500 hover:text-cyan-600"
                                                    to={`/${page}`}
                                                >
                                                    {page}
                                                    {index !== pagelocation.length - 1 && (
                                                        <AiOutlineRight className="flex-shrink-0 mx-3 h-2.5 w-2.5 text-gray-600 dark:text-gray-600" />
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    }
                                }
                                )
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniNav;