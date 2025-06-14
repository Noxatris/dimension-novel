import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


export default function BtnNextChapter({props} : {props: number | null}) {

    const router = useRouter();

    const handleNextChapter = () => {
        if (props) {
          router.push(`/eternalys/${props}`);
        }
      };


    return (
        <div className="flex justify-between items-center">
            <button
                onClick={handleNextChapter}
                disabled={!props}
                className={`px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${props
                        ? 'bg-gradient-to-r from-yellow-200 to-purple-600 gradientMoveAnimation'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                <FontAwesomeIcon icon={faArrowRight} className="fa-fw" />
            </button>
        </div>
    )
}