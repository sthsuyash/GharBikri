import React from "react";
import HeroCard from "../../components/Card/heroCard";
import { useEffect, useState } from "react";
import Animate from "react-smooth";
import image from "../../assets/Images/main-pic.jpg"
import { Link } from "react-router-dom";

// {/* <div className="max-w-[1440px] mx-auto lg:px-20 relative text-center lg:text-start px-20 py-4 overflow-hidden">
//             {/* add image with text that says "Find your dream home"
// <div className="overflow-hidden rounded-3xl">
//     {/* add image 
//     <div className="relative h-[500px] lg:h-[700px]">
//         {/* <img src={image} alt="Main pic" className="w-full lg:h-auto rounded-3xl" /> 
//         <img src={image} alt="main-pic" className="object-cover w-full h-full" />
//     </div>
//     <div className="absolute top-0 left-0 right-0 bottom-0 lg:w-full lg:h-full py-20 px-32">
//         <h1 className="font-semibold text-gray-700 max-w-[500px] mb-4 lg:text-[96px] lg:leading-none md:text-xl md:leading-tight">Find your dream home</h1>
//         <p className="text-xl mb-10 md:text-white text-gray-900">We help you find a house that suits your needs</p>
//         <button className="rounded-3xl transition-all inline-flex justify-center w-fit shadow-sm px-4 py-3 text-md font-medium text-gray-50 hover:bg-cyan-700 hover:text-white  bg-cyan-600 border border-cyan-600 mb-10">
//             <a href="#search">Search Now</a>
//         </button>
//     </div>
// </div> * /}

const Hero = () => {
    return (
        <>
            <div className="max-w-[1440px] mx-auto relative text-center lg:text-start lg:px-20 py-4 overflow-hidden pb-20">
                <div
                    className={`relative delay-500 transition-all h-fit text-black bg-white flex`}
                >
                    <div
                        className="absolute transition-all duration-1000 ease-in-out w-full h-full object-center lg:rounded-3xl"
                        alt="background"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <div
                        className="self-start z-[2] w-full h-auto mx-auto"
                    >
                        <div className="w-full mx-auto z-[0] py-[400px] md:py-[200px] mt-[-350px] md:mt-[-80px] lg:mt-[0px]">
                            <Animate to="1" from="0" attributeName="opacity">
                                <div className="px-20">
                                    <h1 className="md:text-5xl sm:text-5xl text-4xl font-semibold md:py-6 md:max-w-xl text-gray-700">
                                        Find your dream home
                                    </h1>
                                    <p className="text-xl mb-10 text-cyan-800">
                                        We help you find a house that suits your needs
                                    </p>
                                    <button className="rounded-3xl transition-all inline-flex justify-center w-fit shadow-sm px-4 py-3 text-md font-medium text-gray-50 hover:bg-cyan-700 hover:text-white  bg-cyan-600 border border-cyan-600 mb-10">
                                        <Link to="/about">Learn More</Link>
                                    </button>
                                </div>
                            </Animate>
                        </div>
                    </div>
                </div>
                <div className="absolute z-[2] translate-y-[-80%] w-full h-auto md:translate-y-[-80%] lg:translate-y-[-80%] lg:translate-x-[-6%]">
                    <HeroCard />
                </div>
            </div>
        </>
    );
};

export default Hero;