import React from "react";

const people = [
    {
        name: 'Suyash Shrestha',
        role: 'Founder / Full Stack Developer',
        imageUrl:
            'https://avatars.githubusercontent.com/u/92094346?v=4'
    },
    {
        name: 'Prashanna B. Shrestha',
        role: 'Backend Developer',
        imageUrl:
            'https://avatars.githubusercontent.com/u/92351587?v=4',
    },
    {
        name: 'Amish Bajracharya',
        role: 'Frontend Developer',
        imageUrl:
            'https://avatars.githubusercontent.com/u/102971253?v=4',
    }
]

const Team = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto grid gap-x-16 gap-y-20 lg:grid-cols-2">
                <div className="">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-800 sm:text-4xl">Meet our leadership</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 text-justify">
                        At our company, we take great pride in our leadership team. Our leaders are passionate about driving the success of our organization and inspiring our employees to achieve their best. Each member of our leadership team brings a unique set of skills and expertise to the table, allowing us to approach challenges with a well-rounded and strategic mindset. We believe in transparency and open communication, which is why our leaders are always approachable and willing to listen. We are confident that with their guidance, our company will continue to thrive and achieve great things.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-1 sm:gap-y-16 xl:col-span-1">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-20 w-20 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Team;