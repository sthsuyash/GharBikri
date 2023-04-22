import React from "react";

import Header from "../Layouts/Main/Header";
import Stats from '../Layouts/Main/Stats'
import Team from '../Layouts/Main/Team'
import Featured from '../Layouts/Main/Featured'
import Newsletter from '../Layouts/Main/Newsletter'
import Testimonials from '../Layouts/Main/Testimonials'
import Hero from "../Layouts/Main/Hero";
import FeaturedProperty from "../Layouts/Main/FeaturedProperty";

function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Stats />
            <FeaturedProperty />
            <Team />
            <Testimonials />
            <Featured />
            <Newsletter />
        </>
    );
}

export default Home;