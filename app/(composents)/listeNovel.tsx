import Link from 'next/link';
import AnimateSeparator from './animateSeparator';
export default function MesNovels() {
  return (
    <div className="flex flex-col pt-[4vh] md:items-center px-4 md:px-8 lg:px-12">
      <h2 className="medievalFont text-xl md:text-2xl lg:text-3xl ml-6 md:ml-0">Liste Novels</h2>
      <AnimateSeparator />
      <div className="flex justify-center mb-[48px] md:mt-2">
        <Link href="/eternalys" className='flex flex-col w-10/12 md:w-[60%] lg:w-[40%] rounded-xl overflow-hidden items-center pulse-animation pointer-cursor'>
          <img src="/cover.png" alt="Cover" className='w-full h-auto' />
        </Link>
      </div>
    </div>
  );
}