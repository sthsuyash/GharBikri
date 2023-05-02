import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { ImPriceTags } from "react-icons/im";
import { BsHousesFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";

const HeroCard = () => {

    const [location, setLocation] = React.useState("");
    const [minPrice, setMinPrice] = React.useState();
    const [maxPrice, setMaxPrice] = React.useState();
    const [propertyType, setPropertyType] = React.useState("1")

    // on submitting the form, the page is routed to rent page filtered by the user's input
    const handleSubmit = (e) => {
        e.preventDefault();


        // if the user has not entered any value in the fields then all the properties are displayed
        // else the user's input is used

        if (location === "" && minPrice === "" && maxPrice === "" && propertyType === "") {
            <Link to="/rent" />
        }
        else {
            window.location = `/rent?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}&propertyType=${propertyType}`;
        }
    }

    return (
        <form className="flex justify-center items-center" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col items-center ">
                <div className="md:w-[80%] max-w-[1400px] w-[100%] shadow-2xl ">
                    <div className="bg-white p-10">
                        <div className="grid content-center md:grid-cols-2 xl:grid-cols-4 md:gap-5 ">
                            <div>
                                <label className="text-gray-500"><span className="inline-flex"><HiOutlineLocationMarker /></span> Preferred Location</label>
                                <input
                                    type="text"
                                    placeholder="Kathmandu"
                                    className="w-full border-2 border-gray-300 bg-white p-2 mb-4"
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-gray-500"><span className="inline-flex"><ImPriceTags /></span> Avg Price</label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="number"
                                        placeholder="min"
                                        className="w-full border-2 text-gray-500 border-gray-300 bg-white p-2 mb-4"
                                        name="minPrice"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="max"
                                        className="w-full border-2 text-gray-500 border-gray-300 bg-white p-2 mb-4"
                                        name="maxPrice"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className=" text-gray-500"><span className="inline-flex"><BsHousesFill /></span> Property type</label>
                                {/* create a dropdown from the propertyType state  */}
                                <select
                                    className="w-full border-2 border-gray-300 bg-white p-2 mb-4"
                                    name="propertyType"
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                >
                                    <option value="1">House</option>
                                    <option value="2">Apartment</option>
                                    <option value="3">Villa</option>
                                    <option value="4">Office</option>
                                </select>
                            </div>
                            <div className="flex flex-col sm:pt-[5]">

                                <button
                                    className="transition-all bg-blue-600 px-10 py-4 border hover:border-slate-800 text-white w-fit h-fit lg:self-end self-start lg:my-auto hover:bg-white hover:text-blue-900 hover:font-extrabold hover:border-blue"
                                    type="submit"
                                >
                                    Search <span className="inline-flex"><ImSearch /></span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default HeroCard;