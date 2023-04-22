import React from "react"

const HouseCard = ({ house, favourites, setFavourites }) => {

    const makefavourite = (house) => {
        const newFavourite = [...favourites, house];
        setFavourites(newFavourite);
        // console.log(favourites)
    };

    const removefavourite = (house) => {
        const newFavourite = favourites.filter((favourite) => favourite.id !== house.id);
        setFavourites(newFavourite);
        // console.log(favourites)
    };

    return (
        <div
            className="mx-10 overflow-hidden shadow-lg"
        >
            <div className="bg-white roundedoverflow-hidden shadow relative">
                <img
                    className="h-60 w-full object-cover p-2 transition-all hover:scale-105"
                    src={house.image}
                    alt="house"
                />
                <div className="p-4">
                    <div className="flex flex-row">
                        <span className="text-2xl font-bold text-blue-600">Rs.{house.price}</span> <span className="align-bottom">/month</span>
                        {/* add a love button  */}
                        <button
                            className="ml-auto border p-2 rounded-full transition-all"
                            // onclick to add to favourite or remove from favourite and make the button red
                            onClick={() => favourites.find((favourite) => favourite.id === house.id) ? removefavourite(house) : makefavourite(house)}


                        >
                            {/* if the house is in favourite then make the button red */}
                            {favourites.find((favourite) => favourite.id === house.id) ? (
                                <svg
                                    className="transition-all hover:scale-125"
                                    stroke="currentColor"
                                    fill="red"
                                    strokeWidth="0"
                                    viewBox="0 0 1024 1024"
                                    value="[object Object]"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
                                </svg>
                            ) : (
                                <svg
                                    className="transition-all hover:scale-125"
                                    stroke="currentColor"
                                    fill="pink"
                                    strokeWidth="0"
                                    viewBox="0 0 1024 1024"
                                    value="[object Object]"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
                                </svg>
                            )
                            }
                        </button>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">
                        {house.title}
                    </h1>
                    <p className="text-gray-600 text-sm">
                        {house.location}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default HouseCard;

{/* <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">
<a href="#">
    <img
        className="p-8 rounded-t-lg"
        src={house.image}
        alt={house.name}
    />
</a>
<div className="px-5 pb-5">
    <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {house.address}
        </h5>
    </a>
    {/* stars */}
{/* <div className="flex items-center mt-2.5 mb-5">
        <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            5.0
        </span>
    </div> 

    <div className="">
        <span className="text-3xl font-bold text-gray-900">
            $599
        </span> / month

    </div>
</div>
</div> */}