
import { useEffect, useRef } from 'react';

interface UseBackgroundMusicProps {
  isPlaying?: boolean;
  volume?: number;
}

export const useBackgroundMusic = ({ isPlaying = true, volume = 0.3 }: UseBackgroundMusicProps = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free game music URL
    // Using a placeholder URL - in production, you'd host your own music files
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcCT2JzeyvdAoFLGes6uuBYAoUdKzeQA0=';
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions - music will start when user interacts
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

  return {
    toggleMusic,
    setVolume,
    isPlaying: audioRef.current ? !audioRef.current.paused : false
  };
};
