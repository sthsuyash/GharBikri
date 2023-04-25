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
        <div className="mx-10 overflow-hidden shadow-lg rounded-lg">
            <div className="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl relative">
                {/* image div */}
                <Link
                    to={buyRent === true ? `/property/buy/${property.id}` : `/property/rent/${property.id}`} className="relative">
                    <img className="h-56 w-full object-cover" src={property.image} alt="property image" />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </Link>

                <div className="px-4 pb-8 pt-7">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex justify-start">
                            <span className="text-blue-700 text-3xl font-bold">${property.rate}</span>
                            {/* if buyrent is rent then display per month  */}
                            {property.rentBuy === 'Rent' ? <span className="text-gray-500 text-lg font-semibold">&nbsp;/month</span> : null}

                        </div>

                        {/* check for favourites, only allow to set if authenticated*/}
                        {isAuthenticated ?
                            <span className="text-gray-500 cursor-pointer border rounded-full p-2 border-pink-700" onClick={handleFavourite}>
                                {favourites.find(favourite => favourite.id === property.id) ?
                                    <AiFillHeart className="text-red-600 text-2xl" /> :
                                    <AiFillHeart className="text-pink-400 text-2xl" />
                                }
                            </span> : null}
                    </div>
                    {/* title */}
                    <h1 className="font-extrabold text-3xl">{property.title}</h1>
                    {/* rate */}
                    <div className="flex items-center mb-4">
                        <div className="text-gray-400 text-md font-semibold">{property.location.street_number} {property.location.street_name}, {property.location.city}, {property.location.state}</div>
                    </div>
                    <hr className="mb-4" />

                    <div className="flex justify-between">
                        <span className="flex items-center">
                            <span><MdOutlineBed /></span>
                            <span className="text-indigo-700">&nbsp;{property.bedrooms}&nbsp;Beds</span>
                        </span>
                        <div className="flex items-center">
                            <span><BiBath /></span>
                            <span className="text-indigo-700">&nbsp;{property.bathrooms}&nbsp;Bathrooms</span>
                        </div>
                        <div className="flex items-center">
                            <span><BiArea /></span>
                            <span className="text-indigo-500 w-fit">&nbsp;{property.area} sq.ft</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default propertyCard;

