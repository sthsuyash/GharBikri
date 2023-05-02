import React from "react";
import home1 from "../../assets/Images/home1.jpg";
import home2 from "../../assets/Images/home2.jpg";
import home3 from "../../assets/Images/home3.jpg";
import { Link } from "react-router-dom";

const stats = [
    { id: 1, name: 'Apartment Sale', value: '400+' },
    { id: 2, name: 'Completed Project', value: '200+' },
    { id: 3, name: 'Happy Client', value: '500+' },
]

const Stats = () => {
    return (
        <div className="overflow-hidden bg-white sm:py-32 sm:mx-6 lg:mb-0 mb-10">
            <div className="max-w-full mx-6 lg:mx-10 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="relative">

                        <div className="shadow-xl  rounded-lg  hidden lg:inline-block overflow-hidden">
                            <img
                                src={home2}
                                alt="House2"
                                className="h-72 transition-all hover:scale-105"
                            />
                        </div>

                        <div className="absolute top-20 left-32 shadow-xl  rounded-lg hidden lg:inline-block overflow-hidden z-10">
                            <img
                                src={home1}
                                alt="House1"
                                className="h-96 transition-all hover:scale-105"
                            />
                        </div>

                        <div className="absolute top-12 left-72 shadow-2xl h-80  z-0 rounded-lg hidden lg:inline-block overflow-hidden">
                            <img
                                src={home3}
                                alt="House3"
                                className="transition-all hover:scale-105 "
                            />
                        </div>
                    </div>

                    <div>
                        <div className="lg:w-2xl w-lg ">
                            <h2 className="text-6xl font-bold  text-gray-800">Get to Know Us More</h2>
                            <p className="mt-10 text-lg  text-gray-400 mb-4 text-justify w-full lg:w-3/4">
                                We are a company that provides a variety of services in the field of real estate, we are ready to help you find a house that suits your needs.
                            </p>
                            <Link
                                to="/about"
                                className="transition-all inline-flex justify-center w-fit border border-gray-300 shadow-sm px-4 py-3 text-md font-medium text-gray-50 hover:bg-gray-50 hover:text-gray-950  bg-blue-600 hover:font-bold mb-10"
                                id="options-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                            >Read More &rarr;
                            </Link>

                            <dl className="grid grid-cols-1 gap-x-8 gap-y-16  lg:grid-cols-3 py-10">
                                {stats.map((stat) => (
                                    <div key={stat.id} className="flex max-w-xs flex-col gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                        <dd className="order-first text-6xl font-bold text-blue-700 sm:text-6xl">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Stats;