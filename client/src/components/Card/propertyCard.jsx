import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";

const propertyCard = ({ property, favourites, setFavourites, buyRent, isAuthenticated }) => {

    // handle favourites
    const handleFavourite = () => {
        // check if property is already in favourites
        const isFavourite = favourites.find(favourite => favourite.id === property.id);
        // if not then add to favourites
        if (!isFavourite) {
            setFavourites([...favourites, property]);
        }
        // if yes then remove from favourites
        else {
            const newFavourites = favourites.filter(favourite => favourite.id !== property.id);
            setFavourites(newFavourites);
        }
    }

    return (
        // if buy then link to buy page else link to rent page
        <div className="mx-auto overflow-hidden shadow-lg rounded-lg max-w-[400px]">
            <div className="max-w-[300px] lg:min-w-[400px] lg:max-w-[400px] mx-auto bg-white overflow-hidden relative">
                {/* image div */}
                <Link
                    to={buyRent === true ? `/property/${property.id}` : `/property/${property.id}`} className="relative">
                    <img className="h-56 w-full object-cover" src={property.image} alt="property image" />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </Link>

                <div className="px-4 lg:py-7 py-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex justify-start">
                            <span className="text-blue-700 lg:text-3xl font-bold text-2xl">${property.rate}</span>
                            {/* if buyrent is rent then display per month  */}
                            {property.rentBuy === 'Rent' ? <span className="text-gray-500 text-lg font-semibold">&nbsp;/month</span> : null}

                        </div>

                        {/* check for favourites, only allow to set if authenticated*/}
                        {isAuthenticated ?
                            <span className="text-gray-500 cursor-pointer border rounded-full p-2 border-pink-700" onClick={handleFavourite}>
                                {favourites.find(favourite => favourite.id === property.id) ?
                                    <AiFillHeart className="text-red-600 lg:text-2xl md:text-2xl text-xl" /> :
                                    <AiFillHeart className="text-pink-400 lg:text-2xl md:text-2xl text-xl" />
                                }
                            </span> : null}
                    </div>
                    {/* title */}
                    <h1 className="font-extrabold lg:text-3xl text-2xl">{property.title}</h1>
                    {/* rate */}
                    <div className="flex items-center mb-4">
                        <div className="text-gray-400 lg:text-md md:text-sm font-semibold text-xs pt-1">{property.location.street_number} {property.location.street_name}, {property.location.city}, {property.location.state}</div>
                    </div>
                    <hr className="lg:mb-4 md:mb-4 mb-3" />

                    <div className="lg:text-sm flex justify-between text-xs">
                        <span className="flex items-center">
                            <span className="text-indigo-700"><MdOutlineBed /></span>
                            <span>&nbsp;{property.bedrooms}&nbsp;Beds</span>
                        </span>
                        <div className="flex items-center">
                            <span className="text-indigo-700"><BiBath /></span>
                            <span>&nbsp;{property.bathrooms}&nbsp;Bathrooms</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-indigo-700"><BiArea /></span>
                            <span>&nbsp;{property.area} sq.ft</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default propertyCard;
