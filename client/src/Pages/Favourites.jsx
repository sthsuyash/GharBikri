import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import MiniNav from "../components/MiniNav/MiniNav";
import { Link } from "react-router-dom";


export default function Favourites() {

    useEffect(() => {
        document.title = "Favourites | GharBikri";
    }, []);

    const [user, setUser] = useState({
        user_id: "",
        first_name: "",
        last_name: "",
        user_email: "",
        phone_number: "",
        address_city: "",
        address_state: "",
        created_at: "",
        updated_at: "",
        property_count: ""
    });

    useEffect(() => {
        loadUser();
    }, []);

    user.created_at = new Date(user.created_at).toLocaleDateString();
    user.updated_at = new Date(user.updated_at).toLocaleDateString();

    // load user who is logged in
    const loadUser = async () => {
        const result = await axios.get("http://localhost:3000/api/dashboard", {
            headers: { token: localStorage.token }
        });
        setUser(result.data);
    };



    return (
        <>
            <div className="max-w-[1280px] mx-auto lg:p-6 w-[90%]">
                <MiniNav />
                <h1 className="text-3xl font-semibold text-center lg:text-left my-8 lg:text-5xl">{user.first_name}&apos;s Favourites</h1>
            </div>
        </>
    );
}