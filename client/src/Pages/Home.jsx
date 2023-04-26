import React from "react";

import Header from "../Layouts/homeMain/Header";
import Stats from '../Layouts/homeMain/Stats'
import Team from '../Layouts/homeMain/Team'
import Featured from '../Layouts/homeMain/Featured'
import Newsletter from '../Layouts/homeMain/Newsletter'
import Testimonials from '../Layouts/homeMain/Testimonials'
import Hero from "../Layouts/homeMain/Hero";
import FeaturedProperty from "../Layouts/homeMain/FeaturedProperty";

function Home({isAuthenticated}) {
    return (
        <>
            <Header />
            <Hero />
            <Stats />
            <FeaturedProperty isAuthenticated={isAuthenticated} />
            <Team />
            <Testimonials />
            <Featured />
            <Newsletter />
        </>
    );
}

export default Home;