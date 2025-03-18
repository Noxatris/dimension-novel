import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function InfoBulle() {
    return (
        <aside className='self-end xl:absolute top-10 right-10 flex flex-col w-[50%] xl:w-auto xl:flex-row items-center p-4 rounded-bl-lg bg-black/50 xl:bg-transparent text-white text-center'>
            <FontAwesomeIcon icon={faStar} className="fa-fw fa-beat text-pink-500 mr-3 text-2xl" />
            <p>Un nouveau chapitre tous les <span className='text-pink-500 border-b-2 border-pink-500'>Lundi</span> et <span className='text-pink-500 border-b-2 border-pink-500'>Jeudi</span></p>
        </aside>
    )
}