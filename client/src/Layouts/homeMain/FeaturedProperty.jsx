import React from "react";

export default function FeaturedProperty() {
    return (
        <>
            <div className="max-w-[1440px] mx-auto p-20">
                <div className="p-20 rounded-3xl bg-gray-100">
                    <h2 className="mb-3 font-semibold text-[48px]">Featured Property</h2>
                    <div className="travels__info info">Let’s go on an adventure</div>
                    <div className="travels__sorting">
                        <div className="nav">
                            <a className="nav__link active" href="#">
                                <svg className="icon icon-coin">
                                    <use xlinkHref="#icon-coin" />
                                </svg>
                                Featured
                            </a>
                            <a className="nav__link" href="#">
                                <svg className="icon icon-coin">
                                    <use xlinkHref="#icon-coin" />
                                </svg>
                                Family-friendly
                            </a>
                            <a className="nav__link" href="#">
                                <svg className="icon icon-coin">
                                    <use xlinkHref="#icon-coin" />
                                </svg>
                                On sale
                            </a>
                            <a className="nav__link" href="#">
                                <svg className="icon icon-coin">
                                    <use xlinkHref="#icon-coin" />
                                </svg>
                                Sub nav
                            </a>
                        </div>
                        <div className="travels__select tablet-show">
                            <select className="select" style={{ display: "none" }}>
                                <option>Featured</option>
                                <option>Family-friendly</option>
                                <option>On sale</option>
                                <option>Sub nav</option>
                            </select>
                            <div className="nice-select select" tabIndex={0}>
                                <span className="current">Featured</span>
                                <ul className="list">
                                    <li data-value="Featured" className="option selected">
                                        Featured
                                    </li>
                                    <li data-value="Family-friendly" className="option">
                                        Family-friendly
                                    </li>
                                    <li data-value="On sale" className="option">
                                        On sale
                                    </li>
                                    <li data-value="Sub nav" className="option">
                                        Sub nav
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="travels__select">
                            <select className="select" style={{ display: "none" }}>
                                <option>Recently added</option>
                                <option>Long added</option>
                            </select>
                            <div className="nice-select select" tabIndex={0}>
                                <span className="current">Recently added</span>
                                <ul className="list">
                                    <li data-value="Recently added" className="option selected">
                                        Recently added
                                    </li>
                                    <li data-value="Long added" className="option">
                                        Long added
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="travels__list">
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-1.jpg 2x"
                                    src="img/content/catalog-pic-1@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">Karineside</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-2.jpg 2x"
                                    src="img/content/catalog-pic-2@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">East Barrett</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-3.jpg 2x"
                                    src="img/content/catalog-pic-3@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">Steuberbury</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-4.jpg 2x"
                                    src="img/content/catalog-pic-4@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">Idaview</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-5.jpg 2x"
                                    src="img/content/catalog-pic-5@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">Yasminfurt</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-6.jpg 2x"
                                    src="img/content/catalog-pic-6@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">North Edenshire</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-7.jpg 2x"
                                    src="img/content/catalog-pic-7@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">Archibaldtown</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a className="travels__card" href="stays-product.html">
                            <div className="travels__preview">
                                <img
                                    srcSet="img/content/catalog-pic-1.jpg 2x"
                                    src="img/content/catalog-pic-1@2x.jpg"
                                    alt="Card"
                                />
                            </div>
                            <div className="travels__body">
                                <div className="travels__line">
                                    <div className="travels__details">
                                        <div className="travels__subtitle">The grand resort</div>
                                        <div className="travels__location">West Gregoria</div>
                                    </div>
                                    <div className="travels__price">
                                        <div className="travels__old">$356</div>
                                        <div className="travels__actual">$267</div>
                                    </div>
                                </div>
                                <div className="travels__line">
                                    <div className="travels__date">Tue, Jul 20 - Fri, Jul 23</div>
                                    <div className="travels__rating">
                                        <svg className="icon icon-star">
                                            <use xlinkHref="#icon-star" />
                                        </svg>
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="travels__btns">
                        <a className="button-stroke button-small" href="stays-category.html">
                            View all
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

// // this component takes properties data from backend and display it in the home page

// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import PropertyCard from "../../components/Card/propertyCard";
// import { Link } from "react-router-dom";
// import { SERVER_URL } from "../../Config";


// function FeaturedProperty() {
//     const [user, setUser] = useState({
//         user_id: "",
//     });

//     useEffect(() => {
//         loadUser();
//     }, []);

//     const loadUser = async () => {
//         const result = await axios.get("http://localhost:3000/api/dashboard", {
//             headers: { token: localStorage.token }
//         });
//         setUser(result.data);
//     };


//     const [rentProperties, setRentProperties] = useState([]);

//     const [buyProperties, setBuyProperties] = useState([]);

//     const getRentProperties = async () => {
//         try {
//             // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
//             let user_id = user.user_id;
//             const res = await axios.get(`${SERVER_URL}/api/properties/home?user_id=${user_id}&listingtype=Rent`);
//             setRentProperties(res.data.property);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const getBuyProperties = async () => {
//         try {
//             // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
//             let user_id = user.user_id;
//             const res = await axios.get(`${SERVER_URL}/api/properties/home?user_id=${user_id}&listingtype=Buy`);
//             setBuyProperties(res.data.property);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const shouldFetch = useRef(true); // to prevent infinite loop
//     useEffect(() => {
//         if (!shouldFetch.current) {
//             shouldFetch.current = false; // set it to true first time component renders
//         }
//         getRentProperties();
//         getBuyProperties();
//     }, [user]);


//     return (
//         <>
//             <div className="mx-auto max-w-full px-4 lg:px-24 md:px-8 md:flex-row flex lg:flex-row flex-wrap my-0 justify-normal">
//                 <h2 className="text-6xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl sm:mb-5 sm:mx-6">
//                     Featured Properties
//                 </h2>
//             </div>

//             <div className=" bg-slate-100 flex flex-col gap-20 py-14">
//                 {/* return rent */}
//                 <div className="mx-auto">
//                     <div className="flex lg:flex-row lg:px-0 lg:justify-between flex-col mb-6 px-2">
//                         <h2 className="text-5xl font-bold">Rent</h2>
//                         <span className="self-start lg:self-end text-gray-400"><Link to="/rent" className="transition-all hover:underline hover:text-blue-700">Explore all Rent</Link> &rarr;</span>
//                     </div>
//                     <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-3 justify-start md:grid-cols-2">
//                         {/* show all properties whose user_id is not equal to loggedin user  */}
//                         {rentProperties ?
//                             rentProperties.map((property) => (
//                                 <PropertyCard key={property.p_id} property={property} />
//                             )
//                             ) : (
//                                 <div className="text-center text-2xl font-bold text-gray-400">No properties found</div>
//                             )
//                         }
//                     </div>
//                 </div>

//                 {/* return buy */}
//                 <div className="mx-auto">
//                     <div className="flex lg:flex-row lg:px-0 lg:justify-between flex-col mb-6 px-2">
//                         <h2 className="text-5xl font-bold">Buy</h2>
//                         <span className="self-start lg:self-end text-gray-400"><Link to="/rent" className="transition-all hover:underline hover:text-blue-700">Explore all Buy</Link> &rarr;</span>
//                     </div>
//                     <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-3 justify-start md:grid-cols-2">
//                         {buyProperties ?
//                             buyProperties.map((property) => (
//                                 <PropertyCard key={property.p_id} property={property} />
//                             )
//                             ) : (
//                                 <div className="text-center text-2xl font-bold text-gray-400">No properties found</div>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default FeaturedProperty;