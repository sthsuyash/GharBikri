import React from "react";
import { Link } from "react-router-dom";

export default function Rent({property}) {
    return (
        <div>
            <h1>Rent</h1>
            <Link to={`/property/${property.id}`}>Page</Link>
        </div>
    );
}