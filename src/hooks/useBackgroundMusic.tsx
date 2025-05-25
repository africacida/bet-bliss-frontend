
import { useEffect, useRef } from 'react';

interface UseBackgroundMusicProps {
  isPlaying?: boolean;
  volume?: number;
}

export const useBackgroundMusic = ({ isPlaying = true, volume = 0.3 }: UseBackgroundMusicProps = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const lossSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create background music - casino/jackpot style
    const audio = new Audio();
    // Using a more casino-style background music base64
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcCT2JzeyvdAoFLGes6uuBYAoUdKzeQA0=';
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Create win sound effect
    const winSound = new Audio();
    winSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcCT2JzeyvdAoFLGes6uuBYAoUdKzeQA0=';
    winSound.volume = 0.7;
    winSoundRef.current = winSound;

    // Create loss sound effect
    const lossSound = new Audio();
    lossSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcCT2JzeyvdAoFLGes6uuBYAoUdKzeQA0=';
    lossSound.volume = 0.5;
    lossSoundRef.current = lossSound;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      winSoundRef.current = null;
      lossSoundRef.current = null;
    };
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        console.log('Audio autoplay prevented');
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        console.log('Audio play prevented');
      });
    } else {
      audioRef.current.pause();
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  const playWinSound = () => {
    if (winSoundRef.current) {
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.play().catch(() => {
        console.log('Win sound play prevented');
      });
    }
  };

  const playLossSound = () => {
    if (lossSoundRef.current) {
      lossSoundRef.current.currentTime = 0;
      lossSoundRef.current.play().catch(() => {
        console.log('Loss sound play prevented');
      });
    }
  };

  return {
    toggleMusic,
    setVolume,
    playWinSound,
    playLossSound,
    isPlaying: audioRef.current ? !audioRef.current.paused : false
  };
};
