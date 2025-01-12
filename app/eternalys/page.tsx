'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthEurope, faPerson, faScroll, faBook } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Link from 'next/link';


interface Chapter {
  title: string;
  slug: string;
}


export default function EternalysMain() {

  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await fetch('/api/chapters'); // Appel à l'API interne
      const data = await response.json();
      setChapters(data.chapters);
    };
    fetchChapters();
  }, []);

  return (
    <div className='w-full flex flex-col items-center pt-[9vh]'>
      <div className='w-full bg-black/55 flex flex-col items-center bg-top bg-cover shadowTest' style={{ backgroundImage: 'url(coverClear.png)' }} >
        <div className="w-screen pt-8 px-4">
          <h1 className="font-[medievalSharp] text-2xl border-b-4 border-yellow-300 flex justify-center mb-8 pb-1 rounded-md">Eternalys : Éveil et Vengeance</h1>
          <div className="mb-8 *:mb-2">
            <h2 className="ml-4 text-[1.2em] mb-1">Intrigue :</h2>
            <p>Dans un monde où la magie a émergé soudainement, les Éveillés, détenteurs de pouvoirs mystérieux, ont d&apos;abord été accueillis avec espoir avant de semer la division.</p>
            <p>Certains, bienveillants, ont cherché à protéger la société, tandis que d&apos;autres ont plongé les rues dans le chaos. Craignant ces nouveaux pouvoirs, le gouvernement a réagi par une répression brutale, traquant sans distinction les Éveillés.</p>
            <p>Retranché derrière d&apos;immenses murs, le cœur de la ville a abandonné les périphéries à la loi du plus fort.</p>
            <p>Dans ce paysage désolé, une unité rebelle lutte pour la liberté, naviguant entre alliances fragiles, mystères enfouis, et un secret qui pourrait bien changer le cours de leur destin.</p>
          </div>
        </div>
        <div className='p-2 rounded-full gradientMoveAnimation shadow-xl text-[1.2em] mb-8'>
          <FontAwesomeIcon icon={faBook} className="fa-fw" />
          <Link href="/eternalys/chapitres/1" className="px-2">Commencez la lecture</Link>
          <FontAwesomeIcon icon={faScroll} className="fa-fw" />
        </div>
        <div className='w-screen flex-col items-center bg-black/50 py-2'>
          <h2 className="text-[1.2em] mb-1 border-b-4 rounded border-yellow-300 flex justify-center items-center">En savoir plus ?</h2>
          <div className="flex justify-around w-full my-6">
            <div className="bg-black/80 p-2 rounded-full border-2 border-violet-700 text-violet-700 pointer-cursor w-[40%] flex justify-center items-center">
              <FontAwesomeIcon icon={faEarthEurope} className="fa-fw mr-1" />
              <Link href="/eternalys/univers">Univers</Link>
            </div>
            <div className="bg-black/80 p-2 rounded-full border-2 border-yellow-300 text-yellow-300 pointer-cursor w-[40%] flex justify-center items-center">
              <FontAwesomeIcon icon={faPerson} className="fa-fw mr-1" />
              <Link href="/eternalys/personnage">Personnage</Link>
            </div>
          </div>
        </div>
      </div>
      <ul>
        {chapters.map((chapter : Chapter) => (
          <li key={chapter.slug}>
            <Link href={`/eternalys/${chapter.slug}`}>
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
