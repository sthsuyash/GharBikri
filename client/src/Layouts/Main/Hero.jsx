import React from "react";
import HeroCard from "../../components/Card/heroCard";
import backgroundImage from "../../assets/Images/home.jpg";

const Hero = () => {
    return (
        <div className="lg:mx-10 md:px-8">

            <div className="relative w-full h-[700px]">
                {/* Background image */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                />

                {/* Hero search form */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-[1400px] px-8">
                        <HeroCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
