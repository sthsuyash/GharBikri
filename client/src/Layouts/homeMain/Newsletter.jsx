/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React from 'react'
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
    return (
        <div className='max-w-[1440px] mx-auto lg:px-20'>
            <div className="relative isolate overflow-hidden bg-cyan-900 py-16 sm:py-24 lg:py-24 lg:rounded-3xl my-5">
                <div className="px-6 lg:px-12">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg ">
                            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-3xl">Subscribe to our newsletter.</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-300">
                                Stay up-to-date with our latest news and exclusive offers by subscribing to our newsletter.
                            </p>
                            <div className="mt-6 flex max-w-md gap-x-4">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="submit"
                                    className="transition-all flex-none rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                                <dd className="mt-2 leading-7 text-gray-300">
                                    Receive our weekly articles straight to your inbox and stay informed on the latest industry prices.
                                </dd>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 font-semibold text-white">No spam</dt>
                                <dd className="mt-2 leading-7 text-gray-300">
                                    We respect your privacy and promise no spam. You&apos;ll only receive valuable content and updates from us.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <svg
                    className="absolute left-1/2 top-0 -z-10 h-[42.375rem] -translate-x-1/2 blur-3xl xl:-top-6"
                    viewBox="0 0 1155 678"
                    fill="none"
                >
                    <path
                        fill="url(#09dbde42-e95c-4b47-a4d6-0c523c2fca9a)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                        <linearGradient
                            id="09dbde42-e95c-4b47-a4d6-0c523c2fca9a"
                            x1="1155.49"
                            x2="-78.208"
                            y1=".177"
                            y2="474.645"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#9089FC" />
                            <stop offset={1} stopColor="#FF80B5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}
