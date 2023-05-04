import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import PropertyCard from "../components/Card/propertyCard";

export default function Rent() {
    useEffect(() => {
        document.title = "Rental Listings | GharBikri";
    }, []);

    const [user, setUser] = useState({
        user_id: "",
    });

    useEffect(() => {
        loadUser();
    }, [user]);

    const loadUser = async () => {
        const result = await axios.get("http://localhost:3000/api/dashboard", {
            headers: { token: localStorage.token }
        });
        setUser(result.data);
    };

    const [rentProperties, setRentProperties] = useState([]);

    // const getRentProperties = async () => {
    //     try {
    //         // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
    //         let user_id = user.user_id;
    //         const res = await axios.get(`${SERVER_URL}/api/properties/rent?user_id=${user_id}&listingtype=Rent`);
    //         setRentProperties(res.data.property);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // pagination
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(1); // number of properties to show per page [default: 6
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = async (pageNumber) => {
        setPageNumber(pageNumber);
        try {
            // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
            let user_id = user.user_id ? user.user_id : null;
            const res = await axios.get(`${SERVER_URL}/api/properties/rent?user_id=${user_id}&listingtype=Rent&page=${pageNumber}&pageSize=${pageSize}`);
            setRentProperties(res.data.property);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     handlePageChange(pageNumber);
    // }, [pageNumber, user]);

    const shouldFetch = useRef(true); // to prevent infinite loop
    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        handlePageChange();
    }, [pageNumber]);

    return (
        <>
            <div className="flex justify-center items-center">
                <h2 className="text-5xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl sm:mb-5 sm:mx-6 lg:mx-auto my-10">
                    Rental Listings
                </h2>
            </div>

            <div className=" bg-white flex flex-col gap-20 py-14">
                {/* return rent */}
                <div className="mx-auto">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-3 justify-start md:grid-cols-2">
                        {/* show all properties whose user_id is not equal to loggedin user  */}
                        {rentProperties ?
                            rentProperties.map((property) => (
                                <PropertyCard key={property.p_id} property={property} />
                            )
                            ) : (
                                <div className="text-center text-2xl font-bold text-gray-400">No properties found</div>
                            )
                        }
                    </div>
                </div>

            </div>

            <div className="mt-6">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        const isCurrentPage = pageNumber === pageNumber;
                        return (
                            <button
                                key={pageNumber}
                                className={clsx(
                                    'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium',
                                    isCurrentPage ? 'z-10 bg-gray-200' : 'hover:bg-gray-50'
                                )}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
