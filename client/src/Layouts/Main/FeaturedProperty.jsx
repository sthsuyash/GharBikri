// this component takes houses data from backend and display it in the home page

import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HouseCard from "../../components/Card/houseCard";
import home1 from "../../assets/Images/home1.jpg";

function FeaturedProperty() {
    const [houses, setHouses] = useState([
        {
            id: 1,
            image: home1,
            title: "Apartment",
            price: 100,
            location: "Jakarta",
        },
        {
            id: 2,
            image: home1,
            title: "Flat",
            price: 150,
            location: "Jakarta",
        },
        {
            id: 3,
            image: home1,
            title: "House",
            price: 180,
            location: "Jakarta",
        }
    ]);

    // use axios to get data from backend
    // useEffect(() => {
    //     axios.get("http://localhost:5000/api/home/houses").then((res) => {
    //         setHouses(res.data);
    //     });
    // }, []);

    const [favorites, setFavorites] = useState([]);

    return (
        <Fragment>
            <div className="mx-auto max-w-full px-4 lg:px-16 md:px-8 md:flex-row flex-col flex lg:flex-row flex-wrap lg:my-16 my-10 justify-normal">
                <h2 className="text-6xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl sm:mb-5">
                    Featured Properties
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16  lg:grid-cols-3 justify-start py-10 px-8">
                {houses.map((house) => (
                    <HouseCard key={house.id} house={house} favourites={favorites} setFavourites={setFavorites} />
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
        </Fragment>
    );
}

export default FeaturedProperty;