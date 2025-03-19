'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthEurope, faPerson, faScroll, faBook } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

export default function Eternalys() {
    return (
        <div className='w-full md:h-auto md:min-h-[90vh] md:w-[60%] xl:w-[30%] xl:m-auto bg-black/55 flex flex-col items-center md:justify-between bg-top bg-cover shadow-shadowBg' style={{ backgroundImage: 'url(coverClear.png)' }} >
            <div className="w-full pt-8 px-4">
                <h1 className="font-[medievalSharp] text-2xl border-b-4 border-yellow-300 flex justify-center mb-8 pb-1 rounded-md">Eternalys : Éveil et Vengeance</h1>
                <div className="mb-8 *:mb-2 md:px-6">
                    <h2 className="ml-4 text-[1.2em] mb-1">Intrigue :</h2>
                    <p>Dans un monde où la magie a émergé soudainement, les Éveillés, détenteurs de pouvoirs mystérieux, ont d&apos;abord été accueillis avec espoir avant de semer la division.</p>
                    <p>Certains, bienveillants, ont cherché à protéger la société, tandis que d&apos;autres ont plongé les rues dans le chaos. Craignant ces nouveaux pouvoirs, le gouvernement a réagi par une répression brutale, traquant sans distinction les Éveillés.</p>
                    <p>Retranché derrière d&apos;immenses murs, le cœur de la ville a abandonné les périphéries à la loi du plus fort.</p>
                    <p>Dans ce paysage désolé, une unité rebelle lutte pour la liberté, naviguant entre alliances fragiles, mystères enfouis, et un secret qui pourrait bien changer le cours de leur destin.</p>
                </div>
            </div>
            <Link href="/eternalys/chapitre-1" className='flex justify-center items-center p-2 rounded-full bg-gradient-to-r from-yellow-200 to-purple-600 gradientMoveAnimation shadow-xl text-[1.2em] mb-8 hover:bg-yellow-300 hover:text-black transition-all duration-300'>
                <FontAwesomeIcon icon={faBook} className="fa-fw" />
                <p className="px-2">Commencez la lecture</p>
                <FontAwesomeIcon icon={faScroll} className="fa-fw" />
            </Link>
            <div className='w-full flex-col items-center bg-black/50 py-2'>
                <h2 className="text-[1.2em] mb-1 border-b-4 rounded border-yellow-300 flex justify-center items-center">En savoir plus ?</h2>
                <p className='w-full flex justify-center items-center'>Pas encore implémenter</p>
                <div className="flex justify-around w-full my-6">
                    <div className="bg-black/80 p-2 rounded-full border-2 border-violet-700 text-violet-700 pointer-cursor w-[40%] flex justify-center items-center hover:bg-violet-700 hover:text-white transition-all duration-300">
                        <FontAwesomeIcon icon={faEarthEurope} className="fa-fw mr-1" />
                        <Link href="/eternalys/univers">Univers</Link>
                    </div>
                    <div className="bg-black/80 p-2 rounded-full border-2 border-yellow-300 text-yellow-300 pointer-cursor w-[40%] flex justify-center items-center hover:bg-yellow-300 hover:text-black transition-all duration-300">
                        <FontAwesomeIcon icon={faPerson} className="fa-fw mr-1" />
                        <Link href="/eternalys/personnage">Personnage</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}