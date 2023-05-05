import React, { useEffect } from "react";
import Team from "../Layouts/About/Team";
import Featured from "../Layouts/About/Featured";
import MiniNav from "../components/MiniNav/MiniNav";
import { FaUsers, FaHeadset, FaDesktop, FaCertificate, FaShoppingCart, FaHandshake, FaKey } from "react-icons/fa";

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Who We Are | GharBikri";
    }, []);

    return (
        <div>
            <div className="mx-auto max-w-[1280px] w-[90%] lg:p-6">
                <div>
                    <MiniNav />
                </div>
                <div className="leading-7 text-justify">
                    <div className="grid gap-12">
                        <div>
                            <h2 className="text-5xl text-gray-800 font-semibold lg:text-5xl mb-10">
                                About Us
                            </h2>
                            <p className="mt-3 text-gray-800">
                                We extend a warm welcome to <span className="font-bold">GharBikri</span> - your ultimate destination for all your real estate requirements! Whether you are seeking to buy, sell, or rent a property, our comprehensive suite of services caters to all your needs with utmost care and attention.
                            </p>
                            <br />
                            <p>
                                At GharBikri, we strongly believe that everyone deserves a safe and comfortable abode to call their own. Hence, we strive to offer an exceptional real estate experience, minimizing your hassles and stress. Our extensive network of seasoned agents and brokers, coupled with state-of-the-art technology and exceptional customer support, provides you with the best possible assistance to find your dream home, sell your existing property, or manage your rental investments.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-3">
                                Our Story
                            </h3>
                            <p className="text-gray-800">
                                Incorporated in 2023 by our visionary founder, GharBikri aims to revolutionize the real estate industry through cutting-edge technology, offering an efficient and seamless platform for buyers, sellers, and renters to transact with confidence, convenience, and peace of mind.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-3">
                                Our Mission
                            </h3>
                            <p className="text-gray-800">
                                At GharBikri, we are on a mission to simplify the real estate process and minimize your stress levels. Our unwavering commitment to delivering top-notch customer service ensures that you receive unparalleled support at every stage of your real estate journey. Whether you&apos;re in the market to buy, sell, or rent property, we&apos;re dedicated to assisting you in finding your dream home, selling your current property, or managing your rental investments.
                            </p>
                            <br />
                            <p>
                                Our team of seasoned professionals is well-equipped to handle your real estate needs, regardless of your experience in the market. As your trusted partner, we strive to help you achieve your goals and make your real estate journey a resounding success. Get in touch with us today to learn more about how we can assist you in your real estate endeavors.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-3">
                                Our Vision
                            </h3>
                            <p className="text-gray-800">
                                Our vision is to be the leading real estate company in the country. We&apos;re committed to providing you with the best possible customer service every step of the way. Whether you&apos;re buying, selling, or renting property, we&apos;re here to help you find your dream home, sell your current property, or manage your rental portfolio.

                            </p>
                        </div>

                        <div>
                            <Team />
                        </div>

                        <div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-5">
                                Our Services
                            </h3>
                            <p className="text-gray-800">
                                We offer a wide range of services to help you buy, sell, or rent property. Here are just a few of the things we can do for you:
                            </p>
                            <br />

                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                                    <FaShoppingCart className="inline-block mr-2" />Buy:
                                </h3>

                                <ul className="list-disc list-inside text-gray-800">

                                    <li>Help you find the perfect property that meets your needs and budget</li>
                                    <li>Guide you through the buying process, from making an offer to closing the deal</li>
                                    <li>Assist with financing options and mortgage pre-approvals.</li>
                                </ul>

                                <br />

                                <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                                    <FaHandshake className="inline-block mr-2" />Sell:
                                </h3>
                                <ul className="list-disc list-inside text-gray-800">
                                    <li>Help you price your property competitively and market it effectively to potential buyers</li>
                                    <li>Handle all the paperwork and legal aspects of the transaction</li>
                                    <li>Negotiate on your behalf to get you the best possible deal</li>
                                </ul>

                                <br />

                                <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                                    <FaKey className="inline-block mr-2" />Rent:
                                </h3>
                                <ul className="list-disc list-inside text-gray-800">
                                    <li>Help you find the perfect rental property that meets your needs and budget</li>
                                    <li>Handle all the paperwork and legal aspects of the rental agreement</li>
                                    <li>Manage your rental property portfolio, including finding tenants, collecting rent, and handling maintenance requests</li>
                                </ul>
                            </div>
                        </div>

                        <Featured />

                        <div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-5">
                                Why Choose Us?
                            </h3>
                            <p className="text-gray-800">
                                With so many real estate companies out there, why should you choose GharBikri? Here are just a few reasons:
                            </p>
                            <br />
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        <FaCertificate className="inline-block mr-2" />Expertise:
                                    </h3>
                                    <p className="text-gray-800">
                                        Our team of real estate professionals has years of experience and a deep understanding of the local market. We can help you navigate the complex real estate landscape and make informed decisions that are in your best interests.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        <FaDesktop className="inline-block mr-2" />Technology:
                                    </h3>
                                    <p className="text-gray-800">
                                        At GharBikri, we believe that technology should make your life easier. That&apos;s why we&apos;ve invested in cutting-edge tools and software to streamline the real estate process and provide you with a seamless, hassle-free experience.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        <FaHeadset className="inline-block mr-2" />
                                        Customer Service:
                                    </h3>
                                    <p className="text-gray-800">
                                        We understand that buying, selling, or renting property can be stressful. That&apos;s why we&apos;re here to provide you with the best possible customer service every step of the way. We&apos;re always available to answer your questions, provide guidance, and help you make informed decisions.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        <FaUsers className="inline-block mr-2" />Community:
                                    </h3>
                                    <p className="text-gray-800">
                                        We&apos;re not just a real estate company - we&apos;re part of the community. We&apos;re committed to giving back and making a positive impact in the areas we serve. When you work with us, you&apos;re not just getting a real estate agent - you&apos;re getting a partner who&apos;s invested in your success.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                                Contact Us
                            </h3>
                            <p className="text-gray-800">
                                Ready to get started? Contact us today to learn more about our services and how we can help you achieve your real estate goals. Whether you&apos;re looking to buy, sell, or rent property, we&apos;re here to help you every step of the way. Thank you for choosing GharBikri!
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-800">
                                At GharBikri, we believe in transparency and honesty in all our dealings. We understand the importance of clear communication, and we make sure that our clients are always kept informed throughout the process. Our goal is to establish long-term relationships with our clients by providing them with the best possible service and exceeding their expectations.
                            </p>
                            <br />
                            <p className="text-gray-800">
                                Our website is designed to be user-friendly and easy to navigate. We offer a wide range of properties for sale or rent, including apartments, houses, and commercial properties. Our listings are regularly updated to ensure that you have access to the latest and most accurate information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;