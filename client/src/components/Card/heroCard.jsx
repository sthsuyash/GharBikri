import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { ImPriceTags } from "react-icons/im";
import { BsHousesFill } from "react-icons/bs";

const HeroCard = () => {

    return (
        <form className="flex justify-center items-center" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full flex flex-col items-center">
                <div className="md:w-[80%] max-w-[1300px] w-[100%] shadow-2xl">
                    <div className="bg-white p-10">
                        <div className="grid content-center md:grid-cols-2 xl:grid-cols-4 md:gap-5 ">
                            <div>
                                <label className="text-gray-500"><span className="inline-flex"><HiOutlineLocationMarker /></span> Preferred Location</label>
                                <input
                                    type="text"
                                    placeholder="Kathmandu"
                                    className="w-full border-2 border-gray-300 bg-white p-2 mb-4"
                                />
                            </div>

                            <div>
                                <label className="text-gray-500"><span className="inline-flex"><ImPriceTags /></span> Avg Price</label>
                                <input
                                    type="number"
                                    placeholder="$500-$1000"
                                    className="w-full border-2 text-gray-500 border-gray-300 bg-white p-2 mb-4"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className=" text-gray-500"><span className="inline-flex"><BsHousesFill /></span> Property type</label>
                                <select
                                    id="hs-select-label"
                                    className="w-full text-gray-500 border-2 border-gray-300 bg-white p-2"
                                >
                                    <option value="1">House</option>
                                    <option value="2">Apartment</option>
                                    <option value="3">Villa</option>
                                    <option value="4">Office</option>
                                </select>
                            </div>
                            <div className="flex flex-col sm:pt-[5]">

                                <button className="bg-blue-700 px-10 py-4 text-white w-fit h-fit lg:self-end self-start lg:my-auto">
                                    Search
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