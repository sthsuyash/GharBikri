import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";

const propertyCard = ({ property }) => {

    return (
        // if buy then link to buy page else link to rent page
        <div className="mx-auto overflow-hidden shadow-lg rounded-lg max-w-[400px]">
            <div className="max-w-[300px] lg:min-w-[400px] lg:max-w-[400px] mx-auto bg-white overflow-hidden relative">
                {/* image div */}
                <Link
                    to={`/property/${property.p_id}`} className="relative">
                    <img className="h-56 w-full object-cover" src={property.frontal} alt="property image" />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </Link>

                <div className="px-4 lg:py-7 py-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex justify-start">
                            <span className="text-blue-700 lg:text-3xl font-bold text-2xl">${property.p_price}</span>
                            {/* if property.listingType is rent then display per month  */}
                            {property.p_listingType === 'Rent' ? <span className="text-gray-500 text-lg font-semibold">&nbsp;/month</span> : null}

                        </div>
                    </div>
                    {/* title */}
                    <h1 className="font-extrabold lg:text-3xl text-2xl">{property.p_name}</h1>
                    {/* price */}
                    <div className="flex items-center mb-4">
                        <div className="text-gray-400 lg:text-md md:text-sm font-semibold text-xs pt-1">{property.p_address_street_num} {property.p_address_street_name} • {property.p_address_city} • {property.p_address_state}</div>
                    </div>
                    <hr className="lg:mb-4 md:mb-4 mb-3" />

                    <div className="lg:text-sm flex justify-between text-xs">
                        <span className="flex items-center">
                            <span className="text-indigo-700"><MdOutlineBed /></span>
                            <span>&nbsp;{property.p_bed}&nbsp;Beds</span>
                        </span>
                        <div className="flex items-center">
                            <span className="text-indigo-700"><BiBath /></span>
                            <span>&nbsp;{property.p_bath}&nbsp;Bathrooms</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-indigo-700"><BiArea /></span>
                            <span>&nbsp;{property.p_area_sq_ft} sq.ft</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default propertyCard;
