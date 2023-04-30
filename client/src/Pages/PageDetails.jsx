import React from "react";
import { useParams } from 'react-router-dom';
//import icons
import { BiBath, BiArea } from 'react-icons/bi';
import { BiBed } from 'react-icons/bi';
//import link
import { Link } from 'react-router-dom';

// import bg from "../src/assests/Images/bg.jpg";
// import person from "../assets/Images/person.jpg";


const PropertyDetails = () => {
    //get the house id
    const { id } = useParams();
    console.log(id);
    //get the house based on the id
    // const house = housesData.find(house => {
    //     return house.id == parseInt(id);
    // // })
    // console.log(house)
    return <section>
        <div className='container mx-auto min-h-[800px] mb-14'>
            <div className="flex flex-col lgLflex-row lg:items-center lg:justify-between"></div>
            <div>
                <div>
                    <div className="max-w--[768px]">
                        {/* <img src={bg} alt="House Image"></img> */}

                    </div>
                    <div className="flex gap-x-6 text-violet-700 mb-6">
                        <div className="flex gap-x-2 items-center">
                            <BiBed  className="text-2xl"/>
                            <div>4</div>
                        </div>
                        <div  className="flex gap-x-2 items-center">
                            <BiBath className="text-2xl"/>
                            <div>2</div>
                        </div>
                        <div  className="flex gap-x-2 items-center">
                            <BiArea className="text-2xl"/>
                            <div>4 aana</div>
                        </div>

                    </div>
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos</div>
                </div>
            </div>
            <div>
                <h2 className="text-2x1 font-semibold">House For Sale in Hadigaun</h2>
                <h3 className="text-lg mb-4">Hadigaun,Kathmandu</h3>
            </div>
            <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
                <div className='bg-green-500 text-white px-3 rounded-full'>Residental</div>
                <div className="bg-violet-500 text-white px-3 rounded-full">Nepal</div>
            </div>
            <div className="text-3xl font-semibold text-violet-600">$400,000</div>
        </div>
        <div className="flex-1 bg-pink-100 w-full mb-8 border border-gray-300 rounded-lg px-6 py-8">
            <div className="flex items-center gap-x-4 mb-8">
                <div className="w-20 h-20 p-1 border border-gray-300 rounded-full"> 
                    {/* <img src={person} alt="person"></img> */}
                </div>
                <div>
                    <div className="font-bold text-lg">Amish Bajracharya</div>
                    <Link to=''
                    className="text-violet-700 text-sm">View Listings</Link>
                </div>
                <form>
                    <input className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm" type="text" placeholder="Name" />
                    <input className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm" type="text" placeholder="Email" />
                    <input className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm" type="text" placeholder="Phone" />

                   
                    <textarea className='border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400' placeholder="Message"
                    defaultValue="Hello, I am interested in ..."></textarea>
                    <div className="flex flex-col gap-y-4">
                        <button className="bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition">Send Message</button>
                        <button className="border border-violet-700 hover:border-violet-500 hover:text-violet-500 rounded p-4 text-sm w-full transition ">Call</button>
                    </div>
                </form>

            </div>
        </div>


    </section>
    // return <div>PropertyDetails</div>;

};
export default PropertyDetails;