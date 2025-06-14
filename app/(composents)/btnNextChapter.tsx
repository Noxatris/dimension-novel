'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function BtnNextChapter({ props }: { props: number | null }) {
  const router = useRouter();

  const handleNextChapter = () => {
    if (props) {
      router.push(`/eternalys/${props}`);
    }
  };

  return (
    <div className="w-full md:w-[30%] flex justify-end mt-8 md:mt-0">
      <button
        onClick={handleNextChapter}
        disabled={!props}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300
          ${props
            ? 'bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 text-black shadow-md hover:brightness-110'
            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
          }`}
      >
        Chapitre suivant
        <FontAwesomeIcon icon={faArrowRight} className="fa-fw" />
      </button>
    </div>
  );
}
