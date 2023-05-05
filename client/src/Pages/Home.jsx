import React, { useEffect } from "react";

import Header from "../Layouts/homeMain/Header";
import Stats from '../Layouts/homeMain/Stats'
import Newsletter from '../Layouts/homeMain/Newsletter'
import Testimonials from '../Layouts/homeMain/Testimonials'
import FeaturedProperty from "../Layouts/homeMain/FeaturedProperty";

function Home() {
    useEffect(() => {
        document.title = "GharBikri | Home";
    }, []);

    return (
        <>
            <Header />
            <Stats />
            <FeaturedProperty />
            <Testimonials />
            <Newsletter />
        </>
    );
}

export default Home;