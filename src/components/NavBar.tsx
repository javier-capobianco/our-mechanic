"use client";
import { useState } from "react";
import Image from "next/image";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex px-4 border-b md:shadow-lg items-center relative py-4">
            {/* Logo */}
            <div className="text-lg font-bold md:py-3 py-4">
                <a href="/">
                    <Image
                        src="/OurMechanicLogo-crop.png"
                        alt="Our Mechanic Logo"
                        width={250}
                        height={100}
                        priority
                    />
                </a>
            </div>

            {/* MENU */}
            <ul
                id="menu"
                className={`border-t md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent 
          border-b sm:border-none text-center text-lg transition-all duration-300 ease-in-out 
          ${menuOpen ? "block" : "hidden"} md:flex`}
            >
                <li>
                    <a
                        href="/"
                        className="flex md:inline-flex p-4 items-center hover:bg-gray-50 hover:font-bold"
                    >
                        <span className="hover:bottom-b-red">Home</span>
                    </a>
                </li>
                <li className="relative parent">
                    <a
                        href="/#services"
                        className="flex justify-between md:inline-flex p-4 items-center hover:bg-gray-50 hover:font-bold"
                    >
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a
                        href="/appointments"
                        className="flex md:inline-flex p-4 items-center hover:bg-gray-50 hover:font-bold"
                    >
                        <span>Request Appointment</span>
                    </a>
                </li>
                <li>
                    <a
                        href="/about"
                        className="flex md:inline-flex p-4 items-center hover:bg-gray-50 hover:font-bold"
                    >
                        <span>About us</span>
                    </a>
                </li>
                <li>
                    <a
                        href="/contact"
                        className="flex md:inline-flex p-4 items-center hover:bg-gray-50 hover:font-bold"
                    >
                        <span>Contact</span>
                    </a>
                </li>
            </ul>

            {/* HAMBURGER ICON */}
            <button
                id="menu-toggle"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="ml-auto md:hidden text-gray-500 cursor-pointer p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle Menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M4 5h16M4 12h16M4 19h16"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </nav>
    );
}
