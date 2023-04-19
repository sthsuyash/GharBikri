import React from "react";

import Header from "../Layouts/Main/Header";
import Stats from '../Layouts/Main/Stats'
import Team from '../Layouts/Main/Team'
import Featured from '../Layouts/Main/Featured'
import Newsletter from '../Layouts/Main/Newsletter'
import Testimonials from '../Layouts/Main/Testimonials'
import Hero from "../Layouts/Main/Hero";

function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Stats />
            <Team />
            <Testimonials />
            <Featured />
            <Newsletter />
        </>
    );
}

export default Home;