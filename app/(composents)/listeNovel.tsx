export default function MesNovels() {
    return (
        <div className="h-[45vh] flex flex-col bg-black/50 pt-[4vh] px-2">
            <h2 className="font-[MedievalSharp] text-xl ml-4">LISTE NOVELS</h2>
            <div className="relative w-[50%] h-2 bg-yellow-300 rounded flex items-center mb-3 pb-1">
                <div className="absolute w-1 h-1 rounded-full animate-dotMove shadow-dotEffect"></div>
            </div>
            <div className="flex justify-center">
                <a href="/eternalys" className='flex flex-col w-[60%] rounded-xl overflow-hidden items-center'>
                    <img src="/cover.png" alt="" className='w-full h-[300px]' />
                    <div className="bg-black/75 w-full flex flex-col items-center text-[1.1em] font-[MedievalSharp]">
                        <p>Eternalys</p>
                        <p>Éveil et Vengeance</p>
                    </div>
                </a>
            </div>
        </div>
    );
}