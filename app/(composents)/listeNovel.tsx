export default function MesNovels() {
    return (
        <div className="flex flex-col bg-black/50 pt-[4vh]">
            <h2 className="font-[MedievalSharp] text-xl ml-6">LISTE NOVELS</h2>
            <div className="w-[45%] h-[4px] bg-yellow-300 rounded flex items-center mb-4 ml-2">
                <div className="w-1 h-1 rounded-full animate-dotMove shadow-dotEffect"></div>
            </div>
            <div className="flex justify-center mb-[48px]">
                <a href="/eternalys" className='flex flex-col w-[60%] rounded-xl overflow-hidden items-center pulse-animation pointer-cursor'>
                    <img src="/cover.png" alt="" className='w-full h-[auto]' />
                </a>
            </div>
        </div>
    );
}