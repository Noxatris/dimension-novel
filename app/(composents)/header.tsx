import BtnHome from "./btnHome"

export default function Header() {
    return (
        <header className="w-full shadow-2xl bg-gradient-to-b from-gray-800 to-indigo-600">
            <div className="z-10 flex items-center justify-between bg-black/20 p-4 md:p-8">
                <div className="flex items-center">
                    <img src="/logoAlone.png" alt="Logo" className="h-[45px] md:h-[55px]" />
                    <h1 className="text-2xl md:text-3xl ml-2 medievalFont">Dimension Novels</h1>
                </div>
                <BtnHome />
            </div>
        </header>
    )
}