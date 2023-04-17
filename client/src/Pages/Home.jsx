import React from "react";

import Stats from '../Layouts/Main/Stats'
import Team from '../Layouts/Main/Team'
import Partner from '../Layouts/Main/Partner'
import Newsletter from '../Layouts/Main/Newsletter'
import Testimonials from '../Layouts/Main/Testimonials'

function Home() {
    return (
        <>
            <Stats />
            <Team />
            <Testimonials />
            <Partner />
            <Newsletter />
        </>
    );
}

export default Home;