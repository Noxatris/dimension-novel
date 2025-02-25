'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [text, setText] = useState('Recherche du livre secret...');
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const phrases = [
      'Ouverture du grimoire...',
      'Activation de la magie...',
      'Création du portail...'
    ];

    let i = 0;
    const interval = setInterval(() => {
      setText(phrases[i]);
      i = (i + 1) % phrases.length;
    }, 2200);

    setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loaderState = localStorage.getItem('loaderState');
    if (loaderState !== 'hidden') {
      setIsVisible(true);
    }
  }, []);

  const handleButtonClick = () => {
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('loaderState', 'hidden');
    }, 1000); // Attendre la fin de l'animation avant de retirer du DOM
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, rotateY: 0 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }} // Animation de sortie
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "left center" }}
          className="w-screen h-screen flex flex-col justify-center items-center bg-gray-950 fixed top-0 left-0 z-50"
        >
          <Image src={"/logoAlone.png"} width={200} height={200} alt='Logo Dimension Novel' className='xl:w-[400px] xl:h-[400px]' />
          <h1 className='text-[2em] xl:text-[4em] medievalFont'>Dimension Novels</h1>
          <div className="flex flex-col justify-center items-center mt-8">
            {loading ? (
              <div className="border-2 border-white rounded-lg p-4 w-4/5 max-w-xs text-center animate-fadeIn">
                <div className="text-lg xl:text-xl text-white tracking-wider">{text}</div>
              </div>
            ) : (
              <button
                onClick={handleButtonClick}
                className='border-2 border-white rounded-lg p-4 w-5/5 max-w-xs text-center text-purple-800 animate-pulse hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105'
              >
                <p className="text-lg xl:text-xl tracking-wider">Bienvenue Voyageur</p>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
