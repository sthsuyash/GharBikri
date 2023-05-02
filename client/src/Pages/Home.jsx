import React from "react";

import Header from "../Layouts/homeMain/Header";
import Stats from '../Layouts/homeMain/Stats'
import Newsletter from '../Layouts/homeMain/Newsletter'
import Testimonials from '../Layouts/homeMain/Testimonials'
import Hero from "../Layouts/homeMain/Hero";
import FeaturedProperty from "../Layouts/homeMain/FeaturedProperty";
import Featured from "../Layouts/homeMain/Featured";

function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Stats />
            <FeaturedProperty />
            <Testimonials />
            <Featured />
            <Newsletter />
        </>
    );
}

export default Home;