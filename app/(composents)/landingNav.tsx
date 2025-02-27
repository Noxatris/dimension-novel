"use client";

import GrimoireCard from "./grimoireCard";
import { grimoireData } from "@/app/data/grimoireData";
import { motion } from "framer-motion";

export default function LandingNav() {
    return (
        <div className="flex justify-center items-center w-full xl:h-[70vh] pb-8">
            <div className="flex flex-wrap justify-center xl:justify-around gap-6 w-full px-4">
                {grimoireData.map((grimoire, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            x: index % 2 === 0 ? -400 : 400, // Arrive de gauche ou de droite
                            y: -1000, // Commence en haut
                            rotate: index % 2 === 0 ? -20 : 20, // Rotation plus douce
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.8,
                            ease: "easeOut",
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 80,
                            damping: 12,
                        }}
                        className="w-[80%] xl:w-[30%] min-w-[250px] flex justify-center"
                    >
                        <GrimoireCard {...grimoire} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}