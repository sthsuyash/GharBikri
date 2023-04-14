import React from "react";

import Stats from '../Layouts/Main/Stats'
import Team from '../Layouts/Main/Team'
import Partner from '../Layouts/Main/Partner'
import Newsletter from '../Layouts/Main/Newsletter'

function Home() {
    return (
        <>
            <Stats />
            <Team />
            <Partner />
            <Newsletter />
        </>
    );
}

export default Home;