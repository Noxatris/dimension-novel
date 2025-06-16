import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScroll, faBook } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Eternalys() {
    return (
        <div className='w-full md:h-screen md:max-h-screen md:min-h-[90vh] md:w-[60%] xl:w-[30%] xl:m-auto bg-black/55 flex flex-col items-center md:justify-between bg-top bg-cover shadow-shadowBg' style={{ backgroundImage: 'url(coverClear.png)' }} >
            <div className="w-full pt-8 px-4">
                <h1 className="font-[medievalSharp] text-2xl border-b-4 border-yellow-300 flex justify-center mb-8 pb-1 rounded-md">Eternalys : Éveil et Vengeance</h1>
                <div className="mb-8 *:mb-2 md:px-6 text-sm">
                    <h2 className="ml-4 text-[1.2em] mb-1">Intrigue :</h2>
                    <p>Dans un monde où la magie a émergé soudainement, les Éveillés, détenteurs de pouvoirs mystérieux, ont d&apos;abord été accueillis avec espoir avant de semer la division.</p>
                    <p>Certains, bienveillants, ont cherché à protéger la société, tandis que d&apos;autres ont plongé les rues dans le chaos. Craignant ces nouveaux pouvoirs, le gouvernement a réagi par une répression brutale, traquant sans distinction les Éveillés.</p>
                    <p>Retranché derrière d&apos;immenses murs, le cœur de la ville a abandonné les périphéries à la loi du plus fort.</p>
                    <p>Dans ce paysage désolé, une unité rebelle lutte pour la liberté, naviguant entre alliances fragiles, mystères enfouis, et un secret qui pourrait bien changer le cours de leur destin.</p>
                </div>
            </div>

            <Link href="/eternalys/1" className='flex justify-center items-center p-2 rounded-full bg-gradient-to-r from-yellow-200 to-purple-600 gradientMoveAnimation shadow-xl text-[1.2em] mb-4 hover:bg-yellow-300 hover:text-black transition-all duration-300'>
                <FontAwesomeIcon icon={faBook} className="fa-fw" />
                <p className="px-2">Commencez la lecture</p>
                <FontAwesomeIcon icon={faScroll} className="fa-fw" />
            </Link>

            <div className="w-full bg-black/50 py-4 flex justify-center items-center flex-col gap-4">
                <Link
                    href="/eternalys/univers"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-900 to-purple-700 text-yellow-100 border border-yellow-400 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center gap-3"
                >
                    <FontAwesomeIcon icon={faScroll} />
                    <span className="italic">Accéder aux archives d&apos;Eternalys</span>
                </Link>
                <p className="text-sm italic text-center text-yellow-200 mb-2">Vous souhaitez en apprendre plus ?</p>

            </div>
        </div>
    )
}