import Link from 'next/link';

export default function MesNovels() {
  return (
    <div className="flex flex-col bg-black/50 pt-[4vh] px-4 md:px-8 lg:px-12">
      <h2 className="font-[MedievalSharp] text-xl md:text-2xl lg:text-3xl ml-6">LISTE NOVELS</h2>
      <div className="w-[45%] h-[4px] bg-yellow-300 rounded flex items-center mb-4 ml-2">
        <div className="w-1 h-1 rounded-full animate-dotMove shadow-dotEffect"></div>
      </div>
      <div className="flex justify-center mb-[48px]">
        <Link href="/eternalys" className='flex flex-col w-10/12 md:w-[60%] lg:w-[40%] rounded-xl overflow-hidden items-center pulse-animation pointer-cursor'>
          <img src="/cover.png" alt="Cover" className='w-full h-auto' />
        </Link>
      </div>
    </div>
  );
}