export default function Actualite() {
    return (
        <div className="h-[45vh] flex flex-col bg-black/50 pt-[18vh]">
            <h2 className="font-[MedievalSharp] text-xl ml-6">ACTUALITÉ</h2>
            <div className="w-[45%] h-[4px] bg-yellow-300 rounded flex items-center mb-3 ml-2">
                <div className="w-1 h-1 rounded-full animate-dotMove shadow-dotEffect"></div>
            </div>
            <div className="flex flex-col overflow-y-scroll px-2 custom-scrollbar">
                <div className="border-l-4 rounded-xl border-violet-700 px-3 py-1 mb-6 bg-black/50">
                    <h3 className="text-xl font-[MedievalSharp] border-b-2 mb-3">Le titre de l&apos;actu</h3>
                    <p>Et les information de l&apos;actu evidemment toute incroyable et exeptionnelle et j&apos;écris pas tout ça juste pour remplir, enfin peut etre que si finalement</p>
                </div>
                <div className="border-l-4 rounded-xl border-violet-700 px-3 py-1 bg-black/50">
                    <h3 className="text-xl font-[MedievalSharp] border-b-2 mb-3">Une autre actu pour test le scrolling</h3>
                    <p>Je fais genre j&apos;écris un truk mé en vrai tt le monde sen fou é c just pr tst</p>
                </div>
            </div>
        </div>
    );
}
