import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function BtnHome() {
    return (
        <Link href="/" className="flex justify-center items-center p-2 h-12 w-12 rounded-full gradientMoveAnimation shadow-xl text-[1.2em] hover:bg-yellow-300 hover:text-black transition-all duration-300">
            <FontAwesomeIcon icon={faHome} className="fa-fw" />
        </Link>
    )
}