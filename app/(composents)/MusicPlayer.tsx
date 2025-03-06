import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

interface MusicPlayerProps {
  currentTrack: string | null;
}

export default function MusicPlayer({ currentTrack }: MusicPlayerProps) {
  const [music, setMusic] = useState(false);
  const [volume, setVolume] = useState(100);

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
          audio.volume = volume / 100;
          console.log(`Audio src set to: ${audio.src}`);

          // Charger et jouer l'audio
          await audio.load();
          console.log(`Audio loaded`);

          // Lancer la lecture uniquement si utilisateur a cliqué sur play
          if (music) {
            await audio.play();
            setMusic(true);
          }
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

  const Handlemusic = () => {
    setMusic(!music);
    const audio = audioRef.current;

    if (audio) {
      if (music) {
        audio.pause();
        setMusic(false);
      } else {
        audio.play();
        setMusic(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (audio) {
      const newVolume = Number(e.target.value);
      audio.volume = newVolume / 100;
      setVolume(newVolume);
    }
  };

  return (
    <div className="music-player">
      <audio
        loop={true}
        ref={audioRef}
        className="hidden" />
      <div className="flex justify-between items-center transition-all duration-300">
        <div className={`flex flex-col items-center`}>
          <button onClick={Handlemusic} className={`w-[65px] min-h-[65px] px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${music
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
            : 'bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800'
            }`}>
            <FontAwesomeIcon icon={faMusic} className="fa-fw" />
          </button>
          {music && (
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-[10px] h-[100px] hidden xl:block appearance-none bg-gray-400 accent-blue-800 rounded-full sliderVertical mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}