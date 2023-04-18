import React from "react";

import Header from "../Layouts/Main/Header";
import Stats from '../Layouts/Main/Stats'
import Team from '../Layouts/Main/Team'
import Featured from '../Layouts/Main/Featured'
import Newsletter from '../Layouts/Main/Newsletter'
import Testimonials from '../Layouts/Main/Testimonials'

function Home() {
    return (
        <>
            <Header />
            <Stats />
            <Team />
            <Testimonials />
            <Featured />
            <Newsletter />
        </>
    );
}

export default Home;