import React from "react";

const Stepper = ({ steps, setStep, currentStep, setCurrentStep }) => {



    return (
        <>
            <div className="transition-all max-w-2xl mx-auto px-4 md:px-0">
                <ul aria-label="Steps" className="transition-all items-center text-gray-600 font-medium md:flex">
                    {steps.stepsItems.map((item, idx) => (
                        <li key={idx} aria-current={currentStep == idx + 1 ? "step" : false} className="transition-all flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0">
                            <div className="transition-all flex flex-col items-center md:flex-row md:flex-1">
                                <hr className={`transition-all w-full border hidden md:block ${idx == 0 ? "border-none" : "" || currentStep >= idx + 1 ? "border-blue-600" : ""}`} />
                                <div className={`transition-all w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${currentStep > idx + 1 ? "bg-blue-600 border-blue-600" : "" || currentStep == idx + 1 ? "border-blue-600" : ""}`}>
                                    <span className={`transition-all w-2.5 h-2.5 rounded-full bg-blue-600 ${currentStep != idx + 1 ? "hidden" : ""}`}></span>
                                    {
                                        currentStep > idx + 1 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        ) : ""
                                    }
                                </div>
                                <hr className={`transition-all h-12 border md:w-full md:h-auto ${idx + 1 == steps.stepsItems.length ? "border-none" : "" || currentStep > idx + 1 ? "border-blue-600" : ""}`} />
                            </div>
                            <div className="transition-all h-8 flex justify-center items-center md:mt-3 md:h-auto">
                                <h3 className={`transition-all text-sm ${currentStep == idx + 1 ? "text-blue-600" : ""}`}>
                                    {item}
                                </h3>
                            </div>
                        </li>
                    ))}
                </ul>
              
            </div>


        </>

    )
}

export default Stepper;