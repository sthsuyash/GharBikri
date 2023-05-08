import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";
// import { AiOutlineHeart } from "react-icons/ai";

const propertyCard = ({ property }) => {

    return (
        <div className="shadow-md rounded-3xl overflow-hidden min-w-[300px]">
            {window.location.pathname === "/sell" ?
                <img
                    src={
                        property.p_frontal_image.length > 0 ?
                            property.p_frontal_image : "https://via.placeholder.com/400"
                    }
                    alt={`${property.p_frontal_image}`}
                    className="w-full h-32 object-cover hover:scale-105 transition duration-300 ease-in-out"
                /> :
                <img
                    src={`src/assets/uploads/${property.p_frontal_image}`}
                    alt={`${property.p_frontal_image}`}
                    className="w-full h-[250px] object-cover hover:scale-105 transition duration-300 ease-in-out"
                />
            }
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex justify-start">
                        <span className="text-cyan-600 lg:text-3xl font-bold text-2xl">${property.p_price}</span>
                        {/* if property.listingType is rent then display per month  */}
                        {property.p_listingtype === "Rent" ?
                            <span className="text-gray-500 text-lg font-semibold">&nbsp;/month</span> : null
                        }
                    </div>
                </div>
                <Link
                    to={`/property/${property.p_id}`}>
                    <h3 className="text-2xl font-semibold">{property.p_name}</h3>
                </Link>
                <div className="flex items-center mb-3">
                    <div className="text-gray-400 lg:text-md md:text-sm font-medium text-xs pt-1">{property.p_address_street_num} {property.p_address_street_name} • {property.p_address_city} • {property.p_address_state}</div>
                </div>
                <hr className="mb-3" />
                <div className="lg:text-sm flex justify-between text-xs">
                    <span className="flex items-center">
                        <span className="text-cyan-700"><MdOutlineBed /></span>
                        <span>&nbsp;{property.p_bed}&nbsp;Beds</span>
                    </span>
                    <div className="flex items-center">
                        <span className="text-cyan-700"><BiBath /></span>
                        <span>&nbsp;{property.p_bath}&nbsp;Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-cyan-700"><BiArea /></span>
                        <span>&nbsp;{property.p_area_sq_ft} sq.ft</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default propertyCard;
