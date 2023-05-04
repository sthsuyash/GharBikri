import React, { useEffect } from "react";
import Team from "../Layouts/About/Team";

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Who We Are | GharBikri";
    }, []);

    return (
        <div>
            <div>
                <div className="xl:max-w-[1248px] max-w-[90%] mx-auto">
                    <div className=" mx-auto">
                        <div className="grid gap-12">
                            <div>
                                <h2 className="mt-10 text-5xl text-gray-800 font-bold lg:text-6xl">
                                    About Us
                                </h2>
                                <p className="mt-3 text-gray-800">
                                    Welcome to GharBikri - your one-stop-shop for all your real estate needs! Whether you're looking to buy, sell, or rent property, we're here to help you every step of the way.
                                </p>
                                <p>
                                    At GharBikri, we believe that everyone deserves a place to call home. That's why we're committed to making the real estate process as easy and stress-free as possible. With our vast network of agents and brokers, cutting-edge technology, and unparalleled customer service, we're here to help you find your dream home, sell your current property, or manage your rental portfolio.
                                </p>
                            </div>
                            <div className>
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-row gap-4">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-2xl font-bold text-gray-800 ">
                                                Our Story
                                            </h3>
                                            <p className="text-gray-800">

                                                GharBikri was founded by a group of experienced real estate professionals who saw a need for a modern, customer-focused real estate company in the market. Our founders recognized that buying or selling a property can be a daunting task, with so many moving parts and intricate details to consider. They knew that there had to be a better way to do things, and that's how GharBikri was born.
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-2xl font-bold text-gray-800 ">
                                                Our Mission
                                            </h3>
                                            <p className="text-gray-800">
                                                At GharBikri, our mission is simple: to help you find your perfect home. We understand that everyone's needs are different, and we're here to listen to your unique requirements and guide you through the real estate process from start to finish. Whether you're a first-time homebuyer, a seasoned investor, or a busy professional looking to rent, we're here to help.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Team />

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold text-gray-800 ">
                                        Our Services
                                    </h3>
                                    <p className="text-gray-800">
                                        We offer a wide range of services to help you buy, sell, or rent property. Here are just a few of the things we can do for you:
                                    </p>
                                    <div className="flex flex-col gap-2">

                                        <h3 className="text-2xl font-bold text-gray-800 ">
                                            Buy:
                                        </h3>

                                        <ul className="list-disc list-inside text-gray-800">

                                            <li>Help you find the perfect property that meets your needs and budget</li>
                                            <li>Guide you through the buying process, from making an offer to closing the deal</li>
                                            <li>Assist with financing options and mortgage pre-approvals.</li>
                                        </ul>

                                        <h3 className="text-2xl font-bold text-gray-800 ">
                                            Sell:
                                        </h3>
                                        <ul className="list-disc list-inside text-gray-800">
                                            <li>Help you price your property competitively and market it effectively to potential buyers</li>
                                            <li>Handle all the paperwork and legal aspects of the transaction</li>
                                            <li>Negotiate on your behalf to get you the best possible deal</li>
                                        </ul>

                                        <h3 className="text-2xl font-bold text-gray-800 ">
                                            Rent:
                                        </h3>
                                        <ul className="list-disc list-inside text-gray-800">
                                            <li>Help you find the perfect rental property that meets your needs and budget</li>
                                            <li>Handle all the paperwork and legal aspects of the rental agreement</li>
                                            <li>Manage your rental property portfolio, including finding tenants, collecting rent, and handling maintenance requests</li>
                                        </ul>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-800 ">
                                        Why Choose Us?
                                    </h3>
                                    <p className="text-gray-800">
                                        With so many real estate companies out there, why should you choose GharBikri? Here are just a few reasons:
                                    </p>

                                    <h3 className="text-2xl font-bold text-gray-800 ">
                                        Expertise:
                                    </h3>
                                    <p className="text-gray-800">
                                    Our team of real estate professionals has years of experience and a deep understanding of the local market. We can help you navigate the complex real estate landscape and make informed decisions that are in your best interests.
                                    </p>

                                    <h3 className="text-2xl font-bold text-gray-800 ">
                                        Technology:
                                    </h3>
                                    <p className="text-gray-800">
                                    At GharBikri, we believe that technology should make your life easier. That's why we've invested in cutting-edge tools and software to streamline the real estate process and provide you with a seamless, hassle-free experience.
                                    </p>

                                    <h3 className="text-2xl font-bold text-gray-800 ">
                                        Customer Service:
                                    </h3>
                                    <p className="text-gray-800">
                                    We understand that buying, selling, or renting property can be stressful. That's why we're here to provide you with the best possible customer service every step of the way. We're always available to answer your questions, provide guidance, and help you make informed decisions.
                                    </p>

                                    <h3 className="text-2xl font-bold text-gray-800 ">
                                        Community:
                                    </h3>
                                    <p className="text-gray-800">
                                    We're not just a real estate company - we're part of the community. We're committed to giving back and making a positive impact in the areas we serve. When you work with us, you're not just getting a real estate agent - you're getting a partner who's invested in your success.
                                    </p>

                                    <h3 className="text-2xl font-bold text-gray-800 ">
                                        Contact Us
                                    </h3>
                                    <p className="text-gray-800">
                                    Ready to get started? Contact us today to learn more about our services and how we can help you achieve your real estate goals. Whether you're looking to buy, sell, or rent property, we're here to help you every step of the way. Thank you for choosing GharBikri!
                                    </p>
                                    Our commitment to excellence goes beyond just providing quality properties. We also strive to offer a personalized and professional experience for our clients. Whether you're looking to buy, sell, or rent a property, we're here to guide you every step of the way.

                                    Our team of experienced and knowledgeable agents is dedicated to providing the best possible service to our clients. We understand that buying or selling a property can be a complex and overwhelming process, which is why we're here to make it as stress-free as possible. We'll work closely with you to understand your unique needs and preferences, and use our expertise to help you find the perfect property that meets your requirements.

                                    At GharBikri, we believe in transparency and honesty in all our dealings. We understand the importance of clear communication, and we make sure that our clients are always kept informed throughout the process. Our goal is to establish long-term relationships with our clients by providing them with the best possible service and exceeding their expectations.

                                    Our website is designed to be user-friendly and easy to navigate. We offer a wide range of properties for sale or rent, including apartments, houses, and commercial properties. Our listings are regularly updated to ensure that you have access to the latest and most accurate information.

                                    In addition to our property listings, we also provide valuable resources and tools to help you make informed decisions. Our blog features informative articles on various aspects of real estate, and our mortgage calculator can help you estimate your monthly payments.

                                    At GharBikri, we're committed to making your real estate journey a success. Whether you're a first-time buyer or an experienced investor, we're here to help you achieve your goals. Contact us today to learn more about how we can assist you in your real estate journey.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;