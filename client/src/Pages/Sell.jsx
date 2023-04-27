import React, { useState } from "react";
import axios from "axios";
import Stepper from "../Layouts/sellForm/Stepper";

import Property from "../Layouts/sellForm/Property";
import Additional from "../Layouts/sellForm/Additional";
import Docs from "../Layouts/sellForm/Docs";
import Confirm from "../Layouts/sellForm/Confirm";

import { SERVER_URL } from "../config";

export default function Sell() {


    const [propertyName, setPropertyName] = useState("");
    const [propertyStreetnum, setPropertyStreetnum] = useState("");
    const [propertyStreetname, setPropertyStreetname] = useState("");
    const [propertyCity, setPropertyCity] = useState("");
    const [propertyState, setPropertyState] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [propertyType, setPropertyType] = useState("");

    const [propertyBedrooms, setPropertyBedrooms] = useState("");
    const [propertyBathrooms, setPropertyBathrooms] = useState("");
    const [propertyRepairQuality, setPropertyRepairQuality] = useState("");
    const [propertyYear, setPropertyYear] = useState();
    const [propertyArea, setPropertyArea] = useState("");
    const [propertyPrice, setPropertyPrice] = useState("");
    const [listingType, setListingType] = useState("");

    const [availabilityStatus, setAvailabilityStatus] = useState(true);

    const [imageFrontal, setImageFrontal] = useState("");
    const [imageBathroom, setImageBathroom] = useState("");
    const [imageKitchen, setImageKitchen] = useState("");
    const [imageLivingroom, setImageLivingroom] = useState("");

    const [steps, setStep] = useState({
        stepsItems: ["Property", "Additional", "Docs", "Confirm"]
    });

    const [currentStep, setCurrentStep] = useState(1);

    const renderForm = () => {
        switch (currentStep) {
            case 1:
                return <Property
                    propertyName={propertyName}
                    propertyStreetnum={propertyStreetnum}
                    propertyStreetname={propertyStreetname}
                    propertyCity={propertyCity}
                    propertyState={propertyState}
                    propertyDescription={propertyDescription}
                    propertyType={propertyType}
                />
            case 2:
                return <Additional
                    propertyBedrooms={propertyBedrooms}
                    propertyBathrooms={propertyBathrooms}
                    propertyRepairQuality={propertyRepairQuality}
                    propertyYear={propertyYear}
                    propertyArea={propertyArea}
                    propertyPrice={propertyPrice}
                    listingType={listingType}
                    availabilityStatus={availabilityStatus}
                />
            case 3:
                return <Docs
                    imageFrontal={imageFrontal}
                    imageBathroom={imageBathroom}
                    imageKitchen={imageKitchen}
                    imageLivingroom={imageLivingroom}
                />
            case 4:
                return <Confirm />
            default:
                return null
        }
    }

    const handleSubmit = () => {
        // send file to server
        const formData = new FormData();
        formData.append("propertyName", propertyName);
        formData.append("propertyStreetnum", propertyStreetnum);
        formData.append("propertyStreetname", propertyStreetname);
        formData.append("propertyCity", propertyCity);
        formData.append("propertyState", propertyState);
        formData.append("propertyDescription", propertyDescription);
        formData.append("propertyType", propertyType);
        formData.append("propertyBedrooms", propertyBedrooms);
        formData.append("propertyBathrooms", propertyBathrooms);
        formData.append("propertyRepairQuality", propertyRepairQuality);
        formData.append("propertyYear", propertyYear);
        formData.append("propertyArea", propertyArea);
        formData.append("propertyPrice", propertyPrice);
        formData.append("listingType", listingType);
        formData.append("availabilityStatus", availabilityStatus);
        formData.append("imageFrontal", imageFrontal);
        formData.append("imageBathroom", imageBathroom);
        formData.append("imageKitchen", imageKitchen);
        formData.append("imageLivingroom", imageLivingroom);

        axios.post(`${SERVER_URL}/api/properties/sell`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            }
        })
            .then((res) => {
                console.log(res);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
    }


    return (
        <div>
            <Stepper steps={steps} setSteps={setStep} currentStep={currentStep} setCurrentStep={setCurrentStep} />

            {renderForm()}



            <div className="max-w-fit mx-auto flex flex-row gap-5">
                {currentStep > 1 ? (
                    <button className="w-full px-4 py-2 transition-all inline-flex justify-center border border-blue-700 shadow-sm text-md font-medium text-gray-50 hover:bg-gray-50 hover:text-gray-950  bg-blue-600 hover:font-bold" onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
                ) : ""}


                <button
                    className="w-full px-4 py-2 transition-all inline-flex justify-center border border-blue-700 shadow-sm text-md font-medium text-gray-50 hover:bg-gray-50 hover:text-gray-950  bg-blue-600 hover:font-bold"
                    onClick={() => {
                        if (currentStep < steps.stepsItems.length) {
                            setCurrentStep(currentStep + 1)
                        }
                        if (currentStep == steps.stepsItems.length) {
                            handleSubmit();
                        }
                    }}
                >
                    {currentStep == steps.stepsItems.length ? "Submit" : "Next"}
                </button>
            </div>

        </div>
    );
}