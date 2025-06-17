'use client'

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpenIcon, InfoIcon, HeartIcon } from "lucide-react"

export default function GrimoireCard({ color, title, image, description, url, tag }: { color: string, title: string, image: string, description: string, url: string, tag?: string }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const getIcon = () => {
        if (!tag) return <BookOpenIcon className="w-5 h-5 mr-2" />
        const tagLower = tag.toLowerCase()
        if (tagLower.includes("infos") || tagLower.includes("projet")) return <InfoIcon className="w-5 h-5 mr-2" />
        if (tagLower.includes("soutenir")) return <HeartIcon className="w-5 h-5 mr-2" />
        return <BookOpenIcon className="w-5 h-5 mr-2" />
    }

    const handleClick = () => {
        if (window.innerWidth < 768) {
            setIsFlipped((prev) => !prev)
        }
    }

    return (
        <div
            className={`relative flex flex-col items-center justify-center rounded-2xl hover:scale-105 transition-all cursor-pointer py-2 shadow-lg`}
            onMouseEnter={() => window.innerWidth >= 768 && setIsFlipped(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setIsFlipped(false)}
            onClick={handleClick}
        >
            <div className="relative w-[250px] h-[360px] md:w-[390px] md:h-[560px]">
                {/* Image frontale */}
                <motion.div
                    className="absolute w-full h-full backface-hidden"
                    initial={false}
                    animate={{ rotateY: isFlipped ? -180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                >
                    <Image src={image} width={390} height={560} alt="image de grimoire" className="w-full h-full object-cover rounded-2xl shadow-md" />

                    {/* Bandeau titre + tag */}
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-center py-3 px-2 rounded-b-2xl">
                        <h2 className={`medievalFont text-lg md:text-2xl text-${color}`}>{title}</h2>
                        {tag && (
                            <div className="flex justify-center items-center gap-1 text-sm italic text-gray-300">
                                {getIcon()}
                                <span>{tag}</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Face arrière description */}
                <div className={`absolute w-full h-full flex flex-col items-center justify-around p-4 bg-cover bg-center text-white rounded-2xl border-2 border-gray-700 shadow-shadowBg ${isFlipped ? "opacity-100" : "opacity-0"} transition-opacity duration-500 backface-hidden`} style={{ background: 'url(/grimoirePage.jpeg)' }}>
                    <h2 className={`text-${color} medievalFont text-2xl md:text-3xl`}>{title}</h2>
                    <div className="whitespace-pre-line medievalFont text-base md:text-lg p-2 rounded-lg shadow-inner h-[70%] overflow-y-scroll custom-scrollbar">
                        {description}
                    </div>
                    <Link href={url} className="p-2 px-8 border-2 border-white rounded-xl hover:bg-purple-800 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-md medievalFont">Ouvrir</Link>
                </div>
            </div>
        </div>
    )
}
