import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import PropertyCard from "../components/Card/propertyCard";

export default function Sell() {

    // property details
    const [propertyName, setPropertyName] = useState("");
    const [propertyStreetnum, setPropertyStreetnum] = useState();
    const [propertyStreetname, setPropertyStreetname] = useState("");
    const [propertyCity, setPropertyCity] = useState("");
    const [propertyState, setPropertyState] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [propertyType, setPropertyType] = useState("House");
    const [listingType, setListingType] = useState("Rent");

    // additional details
    const [propertyBedrooms, setPropertyBedrooms] = useState();
    const [propertyBathrooms, setPropertyBathrooms] = useState();
    const [propertyArea, setPropertyArea] = useState();
    const [propertyRepairQuality, setPropertyRepairQuality] = useState("Average");
    const [propertyYear, setPropertyYear] = useState();
    const [propertyPrice, setPropertyPrice] = useState();

    const [availabilityStatus, setAvailabilityStatus] = useState(true);

    // docs
    const [frontal, setFrontal] = useState(null);
    const [kitchen, setKitchen] = useState(null);
    const [bath, setBath] = useState(null);
    const [living, setLiving] = useState(null);

    const changePropertyName = (e) => {
        setPropertyName(e.target.value);
    }

    const changePropertyStreetnum = (e) => {
        setPropertyStreetnum(e.target.value);
    }

    const changePropertyStreetname = (e) => {
        setPropertyStreetname(e.target.value);
    }

    const changePropertyCity = (e) => {
        setPropertyCity(e.target.value);
    }

    const changePropertyState = (e) => {
        setPropertyState(e.target.value);
    }

    const changePropertyDescription = (e) => {
        setPropertyDescription(e.target.value);
    }

    const changePropertyType = (e) => {
        setPropertyType(e.target.value);
    }

    const changePropertyBedrooms = (e) => {
        setPropertyBedrooms(e.target.value);
    }

    const changePropertyBathrooms = (e) => {
        setPropertyBathrooms(e.target.value);
    }

    const changePropertyArea = (e) => {
        setPropertyArea(e.target.value);
    }

    const changePropertyRepairQuality = (e) => {
        setPropertyRepairQuality(e.target.value);
    }

    const changePropertyYear = (e) => {
        setPropertyYear(e.target.value);
    }

    const changePropertyPrice = (e) => {
        setPropertyPrice(e.target.value);
    }

    const changeListingType = (e) => {
        setListingType(e.target.value);
    }

    const changeFrontal = (e) => {
        const file = e.target.files[0];
        const name = file.name;
        setFrontal(name);
    };

    const changeBathroom = (e) => {
        const file = e.target.files[0];
        const name = file.name;
        setBath(name);
    };

    const changeKitchen = (e) => {
        const file = e.target.files[0];
        const name = file.name;
        setKitchen(name);
        console.log(file);
    };

    const changeLivingroom = (e) => {
        const file = e.target.files[0];
        const name = file.name;
        setLiving(name);
    };

    const uploadImages = async () => {
        let formData = new FormData();
        formData.append("frontal");
        formData.append("bath");
        formData.append("kitchen");
        formData.append("livingroom");

        const response = axios.post(`${SERVER_URL}/api/properties/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const property = {
            propertyName,
            propertyStreetnum,
            propertyStreetname,
            propertyCity,
            propertyState,
            propertyDescription,
            propertyType,
            propertyBedrooms,
            propertyBathrooms,
            propertyArea,
            propertyRepairQuality,
            propertyYear,
            propertyPrice,
            listingType,
            availabilityStatus,
            frontal,
            bath,
            kitchen,
            living
        }

        uploadImages();

        axios.post(`${SERVER_URL}/api/properties/sell`, property)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = "/sell";
    }

    const property = {
        p_name: propertyName,
        p_address_street_num: propertyStreetnum,
        p_address_street_name: propertyStreetname,
        p_address_city: propertyCity,
        p_address_state: propertyState,
        p_listingType: listingType,
        p_bed: propertyBedrooms,
        p_bath: propertyBathrooms,
        p_area_sq_ft: propertyArea,
        p_price: propertyPrice,
        frontal: frontal,
        p_type: propertyType,
    }

    return (
        <div>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')"
                }}
            />
            <h1 className="text-3xl font-bold text-center my-8 lg:text-5xl">Sell your property</h1>
            <main className="w-full flex mt-10">
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full p-6 max-w-full space-y-8 bg-white text-gray-600 sm:p-0">

                        <div className="flex flex-row justify-around">
                            <form>

                                <div>
                                    {/* form starts */}
                                    <div className="mt-5 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white">
                                                <i className="mdi mdi-home-outline text-lg"></i>
                                            </div>
                                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Property Details</h3>
                                        </div>
                                        <p className="text-gray-400 font-normal">
                                            Please start your listing by providing the following information.
                                        </p>
                                    </div>

                                    <div
                                        className="space-y-5 border rounded-lg p-5"
                                    >

                                        {/* first section */}
                                        <div className="flex flex-col lg:flex-row justify-between gap-y-5">

                                            {/* Property Name */}
                                            <div>
                                                <label className="font-medium">
                                                    Property Name
                                                </label>
                                                <div>
                                                    <input
                                                        name="propertyName"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                        placeholder="Beverly SpringField"
                                                        value={propertyName}
                                                        onChange={(e) => changePropertyName(e)}
                                                    />
                                                </div>
                                                {/* text that shows up when validation error */}
                                                {/* {error.user_email
                                && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.user_email}
                                    </p>
                                )} */}
                                            </div>

                                            {/* Property Type */}
                                            <div>
                                                <label className="font-medium">
                                                    Property Type
                                                </label>
                                                <div className="flex">
                                                    <select
                                                        name="propertyType"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                        value={propertyType}
                                                        onChange={(e) => changePropertyType(e)}
                                                    >
                                                        <option value="House">House</option>
                                                        <option value="Apartment">Apartment</option>
                                                        <option value="Villa">Villa</option>
                                                        <option value="Office">Office</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Listing Type */}
                                            <div>
                                                <label className="font-medium">
                                                    Listing Type
                                                </label>
                                                <div className="flex">
                                                    <select
                                                        name="listingType"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                        value={listingType}
                                                        onChange={(e) => changeListingType(e)}
                                                    >
                                                        <option value="Rent">Rent</option>
                                                        <option value="Sale">Buy</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Property Desription */}
                                        <div>
                                            <label className="font-medium">
                                                Description
                                            </label>
                                            <div className="flex">
                                                <input
                                                    name="propertyDescription"
                                                    type="text"
                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                    placeholder="This is a beautiful house with a pool and a garden."
                                                    value={propertyDescription}
                                                    onChange={(e) => changePropertyDescription(e)}
                                                />
                                            </div>
                                            {/* text that shows up when validation error */}
                                            {/* {error.user_email
                                && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.user_email}
                                    </p>
                                )} */}
                                        </div>

                                        {/* Property Address */}
                                        <div className="flex flex-col lg:flex-row justify-between gap-y-5">
                                            {/* Street Number */}
                                            <div>
                                                <label className="font-medium">
                                                    Street Number
                                                </label>
                                                <div className="flex">
                                                    <input
                                                        name="propertyStreetnum"
                                                        type="number"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                        placeholder="402"
                                                        value={propertyStreetnum}
                                                        onChange={(e) => changePropertyStreetnum(e)}
                                                    />
                                                </div>
                                                {/* text that shows up when validation error */}
                                                {/* {error.user_email
                                && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.user_email}
                                    </p>
                                )} */}
                                            </div>

                                            {/* Street Name */}
                                            <div>
                                                <label className="font-medium">
                                                    Street Name
                                                </label>
                                                <div className="flex">
                                                    <input
                                                        name="propertyStreetname"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                        placeholder="Tokha Road"
                                                        value={propertyStreetname}
                                                        onChange={(e) => changePropertyStreetname(e)}
                                                    />
                                                </div>
                                                {/* text that shows up when validation error */}
                                                {/* {error.user_email
                                && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.user_email}
                                    </p>
                                )} */}
                                            </div>
                                        </div>

                                        {/* City and State */}
                                        <div className="flex flex-col lg:flex-row justify-between gap-y-5">
                                            {/* Property City */}
                                            <div>
                                                <label className="font-medium">
                                                    City
                                                </label>
                                                <div className="flex">
                                                    <input
                                                        name="propertyCity"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                        placeholder="Kathmandu"
                                                        value={propertyCity}
                                                        onChange={(e) => changePropertyCity(e)}
                                                    />
                                                </div>
                                                {/* text that shows up when validation error */}
                                                {/* {error.user_email
                                && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.user_email}
                                    </p>
                                )} */}
                                            </div>

                                            {/* Property State */}
                                            <div>
                                                <label className="font-medium">
                                                    State
                                                </label>
                                                <div className="flex">
                                                    <input
                                                        name="propertyState"
                                                        type="text"
                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                        placeholder="Bagmati"
                                                        value={propertyState}
                                                        onChange={(e) => changePropertyState(e)}
                                                    />
                                                </div>
                                                {/* text that shows up when validation error */}
                                                {/* {error.user_email
                                && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.user_email}
                                    </p>
                                )} */}
                                            </div>
                                        </div>
                                    </div>


                                    {/* second form */}
                                    <>
                                        <div className="mt-5 space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white">
                                                    <i className="mdi mdi-home-outline text-xl"></i>
                                                </div>
                                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Additional Property Details</h3>
                                            </div>
                                            <p className="text-gray-400 font-normal">
                                                Please provide additional details about your property.
                                            </p>
                                        </div>

                                        {/* form starts */}
                                        <div
                                            className="space-y-5 border rounded-lg p-5"
                                        >

                                            {/* first section */}
                                            <div className="flex flex-col lg:flex-row justify-between gap-y-5 gap-x-10">

                                                {/* Property Beds */}
                                                <div>
                                                    <label className="font-medium">
                                                        Beds
                                                    </label>
                                                    <div>
                                                        <input
                                                            name="propertyBedrooms"
                                                            type="number"
                                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                            placeholder="5"
                                                            value={propertyBedrooms}
                                                            onChange={(e) => changePropertyBedrooms(e)}
                                                        />
                                                    </div>
                                                    {/* text that shows up when validation error */}
                                                    {/* {error.user_email
                                && (
                                    <p className="text-red-500 text-xs italic">
                                        {error.user_email}
                                    </p>
                                )} */}
                                                </div>

                                                {/* Property Bathrooms */}
                                                <div>
                                                    <label className="font-medium">
                                                        Baths
                                                    </label>
                                                    <div className="flex">
                                                        <input
                                                            name="propertyBathrooms"
                                                            type="number"
                                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                            placeholder="3"
                                                            value={propertyBathrooms}
                                                            onChange={(e) => changePropertyBathrooms(e)}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Property Area */}
                                                <div>
                                                    <label className="font-medium">
                                                        Area
                                                    </label>
                                                    <div className="flex">
                                                        <input
                                                            name="propertyArea"
                                                            type="number"
                                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                            placeholder="2000"
                                                            value={propertyArea}
                                                            onChange={(e) => changePropertyArea(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* second section */}
                                            <div className="flex flex-col lg:flex-row justify-between gap-y-5 gap-x-5">

                                                {/* Property Repair Quality */}
                                                <div>
                                                    <label className="font-medium">
                                                        Repair Quality
                                                    </label>
                                                    <div className="flex">
                                                        <select
                                                            name="propertyRepairQuality"
                                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                            value={propertyRepairQuality}
                                                            onChange={(e) => changePropertyRepairQuality(e)}
                                                        >
                                                            <option value="Poor">Poor</option>
                                                            <option value="Fair">Fair</option>
                                                            <option value="Average">Average</option>
                                                            <option value="Good">Good</option>
                                                            <option value="Excellent">Excellent</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Property Year */}
                                                <div className="w-20">
                                                    <label className="font-medium">
                                                        Year Built
                                                    </label>
                                                    <div className="flex">
                                                        <input
                                                            name="propertyYear"
                                                            type="number"
                                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                            placeholder="2000"
                                                            value={propertyYear}
                                                            onChange={(e) => changePropertyYear(e)}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Property Price */}
                                                <div>
                                                    <label className="font-medium">
                                                        Price
                                                    </label>
                                                    <div className="flex">
                                                        <input
                                                            name="propertyPrice"
                                                            type="number"
                                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border-2 border-gray-200"
                                                            placeholder="2000"
                                                            value={propertyPrice}
                                                            onChange={(e) => changePropertyPrice(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </>


                                    {/* third form */}
                                    <>
                                        <div className="mt-5 space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white">
                                                    <i className="mdi mdi-home-outline text-xl"></i>
                                                </div>
                                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Upload Images</h3>
                                            </div>
                                            <p className="text-gray-400 font-normal">
                                                Please upload images of your property.
                                            </p>
                                        </div>

                                        {/* form starts */}
                                        <div
                                            className="space-y-5 border rounded-lg p-5"
                                        >
                                            {/* Frontal View */}
                                            <div className="flex flex-col w-full">
                                                <div className="flex flex-col w-full">
                                                    <label className="text-gray-600 font-semibold">Frontal View</label>
                                                </div>
                                                <div className="flex items-center justify-center w-full">
                                                    <label
                                                        htmlFor="frontal"
                                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                                                    >

                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-10 h-10 mb-3 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                SVG, PNG, JPG or GIF
                                                            </p>
                                                        </div>
                                                        <input
                                                            id="frontal"
                                                            name="frontal"
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => changeFrontal(e)}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Living Room */}
                                            <div className="flex flex-col w-full">
                                                <div className="flex flex-col w-full">
                                                    <label className="text-gray-600 font-semibold">Living Room</label>
                                                </div>
                                                <div className="flex items-center justify-center w-full">
                                                    <label
                                                        htmlFor="living"
                                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                                                    >

                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-10 h-10 mb-3 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                SVG, PNG, JPG or GIF
                                                            </p>
                                                        </div>
                                                        <input
                                                            id="living"
                                                            name="living"
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => changeLivingroom(e)}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            {/* kitchen bedroom section */}
                                            <div className="flex flex-col lg:flex-row gap-y-5 gap-x-7">

                                                {/* Kitchen */}
                                                <div className="flex flex-col w-full">
                                                    <div className="flex flex-col w-full">
                                                        <label className="text-gray-600 font-semibold">Kitchen</label>
                                                    </div>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label
                                                            htmlFor="kitchen"
                                                            className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                                                        >
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <svg
                                                                    aria-hidden="true"
                                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                    />
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    SVG, PNG, JPG or GIF
                                                                </p>
                                                            </div>
                                                            <input
                                                                id="kitchen"
                                                                name="kitchen"
                                                                type="file"
                                                                className="hidden"
                                                                onChange={(e) => changeKitchen(e)}
                                                            />

                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Bedroom */}
                                                <div className="flex flex-col w-full">
                                                    <div className="flex flex-col w-full">
                                                        <label className="text-gray-600 font-semibold">Bath</label>
                                                    </div>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label
                                                            htmlFor="bath"
                                                            className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                                                        >
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <svg
                                                                    aria-hidden="true"
                                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                    />
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    SVG, PNG, JPG or GIF
                                                                </p>
                                                            </div>
                                                            <input
                                                                id="bath"
                                                                name="bath"
                                                                type="file"
                                                                className="hidden"
                                                                onChange={(e) => changeBathroom(e)}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                </div>
                                <button
                                    className="px-4 py-2 mt-5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 hover:text-blue-600 border hover:bg-white"
                                    type="submit"
                                    onSubmit={(e) => handleSubmit(e)}
                                >
                                    Submit
                                </button>
                            </form>
                            <div className="hidden lg:block">
                                <>
                                    <div className="mx-auto max-w-fit flex-col flex flex-wrap my-0 justify-center">
                                        <h2 className="text-4xl mx-auto font-extrabold  text-gray-900 mb-5">
                                            Preview
                                        </h2>
                                        <div className="flex flex-wrap justify-center">
                                            <PropertyCard property={property} />
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
