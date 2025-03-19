'use client'

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function GrimoireCard({ color, title, image, description, url }: { color: string, title: string, image: string, description: string, url: string }) {
    const [isFlipped, setIsFlipped] = useState(false)
    
    return (
        <div
            className={`flex flex-col items-center justify-center rounded-2xl hover:scale-110 transition-all cursor-pointer py-2 shadow-lg`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className="relative w-[250px] h-[360px] md:w-[390px] md:h-[560px]">
                {/* Image qui tourne */}
                <motion.div
                    className="absolute w-full h-full"
                    initial={false}
                    animate={{ rotateY: isFlipped ? -180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                >
                    <Image src={image} width={390} height={560} alt="image de grimoire" className="w-full h-full object-cover rounded-2xl shadow-md" />
                </motion.div>

                {/* Description qui apparaît sous l’image */}
                <div className={`absolute w-full h-full flex flex-col text-white items-center justify-around p-4 bg-cover bg-center text-black rounded-2xl border-2 border-gray-700 shadow-shadowBg ${isFlipped ? "opacity-100" : "opacity-0"} transition-opacity duration-500`} style={{ background : 'url(/grimoirePage.jpeg)' }}>
                    <h2 className={`text-${color} medievalFont text-2xl md:text-3xl`}>{title}</h2>
                    <div className="whitespace-pre-line medievalFont text-lg md:text-xl p-2 rounded-lg shadow-inner h-[70%] overflow-y-scroll custom-scrollbar">
                        {description}
                    </div>
                    <Link href={url} className="p-2 px-8 border-2 border-white rounded-xl hover:bg-purple-800 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-md medievalFont">Ouvrir</Link>
                </div>
            </div>
        </div>
    )
}