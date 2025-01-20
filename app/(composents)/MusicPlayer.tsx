import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

interface MusicPlayerProps {
  currentTrack: string | null;
}

export default function MusicPlayer({ currentTrack }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(3);

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

          // Lancer la lecture uniuquement si utilisateur a cliqué sur play
          if(isPlaying) {
            await audio.play();
            setIsPlaying(true);
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

  const togglePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
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
        ref={audioRef}
        className="hidden" />
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={togglePlay}
            className="p-3 w-[40px] h-[40px] flex justify-center items-center border-green-500 border-4 rounded-full shadow-xl overflow-hidden bg-black/40 mr-4"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <div className="flex justify-center items-center">
          <div className="flex justify-between items-center rounded-3xl overflow-hidden bg-black/40">
              <button
                onClick={toggleMute}
                className="p-3 w-[40px] h-[40px] flex justify-center items-center border-green-400 border-4 rounded-full"
              >
                <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full appearance-none bg-zinc-950/80 accent-green-400 ml-2 mr-4 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}