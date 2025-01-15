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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(20);

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
          setIsPlaying(true);
          setDuration(audio.duration);
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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (audio) {
      const newTime = Number(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        className="hidden"
        onTimeUpdate={(e) => { setCurrentTime(e.currentTarget.currentTime) }} />
      <div className="flex flex-col items-center sticky">
        <div className="flex items-center">
          <button
            onClick={togglePlay}
            className="p-3 w-[40px] h-[40px] flex justify-center items-center border-green-500 border-4 rounded-full shadow-xl"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
            className="appearance-none bg-zinc-950/30 timer-slider mx-4 rounded-2xl accent-green-400  cursor-pointer"
          />
          <span className="text-white">{formatTime(currentTime)} / {formatTime(duration)}</span>
          <div className="flex justify-center items-center">
            <button
              onClick={toggleMute}
              className="p-3 mx-2 w-[40px] h-[40px] flex justify-center items-center border-green-400 border-4 rounded-full"
            >
              <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
            </button>
            <div className="flex items-center rounded-full overflow-hidden">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className=" w-4 h-16 appearance-none bg-zinc-950/40 accent-green-400 sliderVertical"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}