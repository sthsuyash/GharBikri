// this component takes properties data from backend and display it in the home page

import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyCard from "../../components/Card/propertyCard";
import frontal1 from "../../assets/Images/mockData/1_frontal.jpg"
import frontal2 from "../../assets/Images/mockData/2_frontal.jpg"
import frontal3 from "../../assets/Images/mockData/3_frontal.jpg"
import frontal4 from "../../assets/Images/mockData/4_frontal.jpg"


function FeaturedProperty() {

    const [properties, setProperties] = useState([
        {
            id: 1,
            image: frontal1,
            rate: '$120,000',
            location: {
                street_number: 420,
                street_name: 'Beverly',
                city: 'SpringField',
                state: 'Beverly',
            },
            title: 'Luxury Apartment',
            bhk: '2',
            bedrooms: 2,
            bathrooms: 2,
            area: '10x10',
            rentBuy: 'Buy'
        },
        {
            id: 2,
            image: frontal2,
            rate: '$180,000',
            location: {
                city: 'SpringField',
                state: 'Beverly'
            },
            title: 'Beverly SpringField',
            bhk: '3',
            bedrooms: 3,
            bathrooms: 3,
            area: '6x9',
            rentBuy: 'Buy'
        },
        {
            id: 3,
            image: frontal3,
            rate: '$90,000',
            location: {
                city: 'SpringField',
                state: 'Beverly'
            },
            title: 'Cozy Apartment',
            bhk: '1',
            bedrooms: 1,
            bathrooms: 1,
            area: '3x8',
            rentBuy: 'Buy'
        },
        {
            id: 4,
            image: frontal4,
            rate: '$900',
            location: {
                city: 'SpringField',
                state: 'Beverly'
            },
            title: 'Palm Harbour',
            bhk: '1',
            bedrooms: 1,
            bathrooms: 1,
            area: '3x5',
            rentBuy: 'Rent'
        }
    ]);

    // use axios to get data from backend
    // useEffect(() => {
    //     axios.get("http://localhost:5000/api/properties/buy").then((res) => {
    //         setProperties(res.data);
    //     });
    // }, []);

    const [favorites, setFavorites] = useState([]);

    return (
        <>
            <div className="mx-auto max-w-full px-4 lg:px-8 md:px-8 md:flex-row flex-col flex lg:flex-row flex-wrap  my-0 justify-normal">
                <h2 className="text-6xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl sm:mb-5 sm:mx-6">
                    Featured Properties
                </h2>
            </div>
            <div className="py-10 bg-slate-100 grid grid-cols-1 gap-x-4 gap-y-16 lg:grid-cols-4 justify-start px-8 sm:grid-cols-2 md:grid-cols-3 md:px-2">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} favourites={favorites} setFavourites={setFavorites} />
                ))}
            </div>

            {/* div to display some centered text */}

            <div className="flex flex-wrap justify-center text-center lg:my-16 my-8 max-w-3xl mx-auto">
                <div className="p-4">
                    <h2 className="text-6xl font-bold text-gray-900 mb-6">
                        wherever you are, you will definitely get a place
                    </h2>
                    <p className="text-gray-400 font-semibold text-lg max-w-xl mx-auto">
                        Wherever you want to live, don&apos;t hesitate to contact us. We will help you find the best place for you.
                    </p>
                </div>
            </div>
        </>
    );
}

export default FeaturedProperty;