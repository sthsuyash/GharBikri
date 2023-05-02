import React, { useEffect } from "react";

export default function Buy() {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Real Estate for Sale | Buy Property | Property Rent or Buy";
    }, []);

    return (
        <div>
            <h1>Buy</h1>
        </div>
    );
}