'use client'

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-screen md:h-[120px] flex flex-wrap items-center shadow-2xl bg-gradient-to-b from-gray-800 to-indigo-600 md:flex-nowrap">
            <div className="flex items-center p-4 md:p-8 w-[80%] md:w-[60%]">
                <div className="flex items-center">
                    <img src="/logoAlone.png" alt="Logo" className="h-[45px] md:h-[55px]" />
                    <h1 className="text-xl md:text-3xl ml-2 medievalFont">Dimension Novels</h1>
                </div>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[20%] p-2 text-white rounded-md focus:outline-none md:hidden"
            >
                <FontAwesomeIcon icon={faBars} className="fa-fw" />
            </button>

            {/* Liste des liens */}
            <ul className={`w-full md:h-full shadow-lg rounded-md overflow-hidden md:w-[40%] md:shadow-none md:flex md:flex-row-reverse md:justify-end md:text-lg transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 md:max-h-[120px] opacity-0 md:opacity-100'}`}>
                <li className="h-full w-full md:w-[25%]">
                    <Link href="/" className="flex justify-center items-center w-full md:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 md:py-0">Home</Link>
                </li>
                <li className="h-full w-full md:w-[25%]">
                    <Link href="/eternalys" className="flex justify-center items-center w-full md:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 md:py-0">Eternalys</Link>
                </li>
                <li className="h-full w-full md:w-[25%]">
                    <Link href="/actualites" className="flex justify-center items-center w-full md:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 md:py-0">Actualité</Link>
                </li>
                <li className="h-full w-full md:w-[25%]">
                    <Link href="/informations" className="flex justify-center items-center w-full md:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 md:py-0">Information</Link>
                </li>
            </ul>
        </header>
    )
}