'use client'

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-screen xl:h-[120px] flex flex-wrap items-center shadow-2xl bg-gradient-to-b from-gray-800 to-indigo-600 xl:flex-nowrap">
            <div className="flex items-center p-4 xl:p-8 w-[80%] xl:w-[60%]">
                <div className="flex items-center">
                    <img src="/logoAlone.png" alt="Logo" className="h-[45px] xl:h-[55px]" />
                    <h1 className="text-xl xl:text-3xl ml-2 medievalFont">Dimension Novels</h1>
                </div>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[20%] p-2 text-white rounded-md focus:outline-none xl:hidden"
            >
                <FontAwesomeIcon icon={faBars} className="fa-fw" />
            </button>

            {/* Liste des liens */}
            <ul className={`w-full xl:h-full shadow-lg rounded-md overflow-hidden xl:w-[40%] xl:shadow-none xl:flex xl:flex-row-reverse xl:justify-end xl:text-lg transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 xl:max-h-[120px] opacity-0 xl:opacity-100'}`}>
                <li className="h-full w-full xl:w-[25%]">
                    <Link href="/" className="flex justify-center items-center w-full xl:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 xl:py-0">Acceuil</Link>
                </li>
                <li className="h-full w-full xl:w-[25%]">
                    <Link href="/eternalys" className="flex justify-center items-center w-full xl:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 xl:py-0">Eternalys</Link>
                </li>
                <li className="h-full w-full xl:w-[25%]">
                    <Link href="/actualites" className="flex justify-center items-center w-full xl:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 xl:py-0">Actualité</Link>
                </li>
                <li className="h-full w-full xl:w-[25%]">
                    <Link href="/informations" className="flex justify-center items-center w-full xl:h-full border-pink-600 hover:bg-black/20 hover:text-pink-600 hover:border-b-4 py-4 xl:py-0">Information</Link>
                </li>
            </ul>
        </header>
    )
}