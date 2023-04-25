import React from "react";
import { Link } from "react-router-dom";

import pageDetails from "./PageDetails";

export default function Rent() {
    return (
        <div>
            <h1>Rent</h1>
            <Link to="/propertyDetails">Page</Link>
        </div>
    );
}