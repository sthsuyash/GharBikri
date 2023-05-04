import React from "react";
import { Link } from "react-router-dom";

const stats = [
    { id: 1, name: 'Apartment Sale', value: '400+' },
    { id: 2, name: 'Completed Project', value: '200+' },
    { id: 3, name: 'Happy Client', value: '500+' },
]

const Stats = () => {
    return (
        <>
            <div className="my-20 max-w-[1280px] mx-auto lg:px-10">
                <div className="max-w-full mx-6 lg:mx-10 lg:px-8">
                    <div className="">
                        <div>
                            <div className="text-center">
                                <h2 className="text-5xl font-semibold  text-gray-800">Get to Know Us More</h2>
                                <p className="mx-auto max-w-3xl mt-10 text-lg text-gray-400 mb-4 w-full">
                                    We are a company that provides a variety of services in the field of real estate, we are ready to help you find a house that suits your needs.
                                </p>
                                <Link
                                    to="/about"
                                    className="transition-all inline-flex justify-center w-fit border border-gray-300 shadow-sm px-4 py-3 text-md font-medium text-gray-50 hover:bg-gray-50 hover:text-gray-950  bg-cyan-600 hover:font-bold mb-10"
                                    id="options-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                >Read More &rarr;
                                </Link>

                                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                                    {stats.map((stat) => (
                                        <div key={stat.id} className="flex flex-col gap-y-4">
                                            <dt className="leading-7 text-gray-400 text-md">{stat.name}</dt>
                                            <dd className="order-first text-6xl font-bold text-cyan-700 sm:text-6xl">
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
        </>
    )
};

export default Stats;