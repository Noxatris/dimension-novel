import { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  currentTrack: string | null;
}

export default function MusicPlayer({ currentTrack }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Vérifier si currentTrack existe et si audioRef est défini
    if (audioRef.current && currentTrack) {
      const audio = audioRef.current;

      const playAudio = async () => {
        try {
          // Log pour déboguer
          console.log(`Attempting to play track: ${currentTrack}`);
          
          // Mise à jour du src de l'audio
          audio.src = `/music/${currentTrack}`;
          console.log(`Audio src set to: ${audio.src}`);

          // Charger et jouer l'audio
          await audio.load();
          console.log(`Audio loaded`);

          // Lancer la lecture
          await audio.play();
          console.log(`Audio playing: ${audio.src}`);
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      };

      // Appeler playAudio pour démarrer la lecture
      playAudio();

      // Nettoyer au démontage (arrêter l'audio)
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [currentTrack]); // Réagir à tout changement de currentTrack

  return (
    <div className="music-player">
      <audio ref={audioRef} controls />
    </div>
  );
}