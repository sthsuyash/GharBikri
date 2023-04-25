import React from "react";

const people = [
    {
        name: 'Suyash Shrestha',
        role: 'Founder / Full Stack Developer / Project Manager',
        imageUrl:
            'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/270185170_2028468553986892_8636852668693236109_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RHADD1PWhCwAX-dnxFD&_nc_ht=scontent.fktm3-1.fna&oh=00_AfC02DjmoOxF9gT70mWiAA2S6uYPVkwtW4veEO-XrEMtYw&oe=6449A6BF'
    },
    {
        name: 'Prashanna Shrestha',
        role: 'Co-Founder / Backend Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Amish Bajracharya',
        role: 'Co-Founder / Frontend Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
]

const Team = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-20 px-6 lg:px-8 lg:grid-cols-2 ">
                <div className="">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 text-justify">
                        At our company, we take great pride in our leadership team. Our leaders are passionate about driving the success of our organization and inspiring our employees to achieve their best. Each member of our leadership team brings a unique set of skills and expertise to the table, allowing us to approach challenges with a well-rounded and strategic mindset. We believe in transparency and open communication, which is why our leaders are always approachable and willing to listen. We are confident that with their guidance, our company will continue to thrive and achieve great things.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-1 sm:gap-y-16 xl:col-span-1">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
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