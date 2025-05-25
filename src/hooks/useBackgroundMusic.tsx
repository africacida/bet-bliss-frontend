
import { useEffect, useRef } from 'react';

interface UseBackgroundMusicProps {
  isPlaying?: boolean;
  volume?: number;
}

export const useBackgroundMusic = ({ isPlaying = true, volume = 0.3 }: UseBackgroundMusicProps = {}) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundOscillatorRef = useRef<OscillatorNode | null>(null);
  const backgroundGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // Initialize Audio Context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      if (backgroundOscillatorRef.current) {
        backgroundOscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createBackgroundMusic = () => {
    if (!audioContextRef.current || isPlayingRef.current) return;

    const ctx = audioContextRef.current;
    
    // Create oscillator for background music
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Casino-style chord progression
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, ctx.currentTime); // A3
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.1, ctx.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    backgroundOscillatorRef.current = oscillator;
    backgroundGainRef.current = gainNode;
    
    // Create a simple melody pattern
    let time = ctx.currentTime;
    const notes = [220, 261.63, 293.66, 329.63, 261.63]; // A, C, D, E, C
    
    const playMelody = () => {
      notes.forEach((freq, index) => {
        oscillator.frequency.setValueAtTime(freq, time + index * 0.8);
      });
      
      // Schedule next melody
      setTimeout(() => {
        if (isPlayingRef.current && oscillator === backgroundOscillatorRef.current) {
          time = ctx.currentTime;
          playMelody();
        }
      }, notes.length * 800);
    };
    
    oscillator.start();
    playMelody();
    isPlayingRef.current = true;
  };

  const stopBackgroundMusic = () => {
    if (backgroundOscillatorRef.current && isPlayingRef.current) {
      backgroundOscillatorRef.current.stop();
      backgroundOscillatorRef.current = null;
      backgroundGainRef.current = null;
      isPlayingRef.current = false;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      createBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [isPlaying, volume]);

  const toggleMusic = () => {
    if (isPlayingRef.current) {
      stopBackgroundMusic();
    } else {
      createBackgroundMusic();
    }
  };

  const setVolume = (newVolume: number) => {
    if (backgroundGainRef.current) {
      backgroundGainRef.current.gain.setValueAtTime(
        Math.max(0, Math.min(1, newVolume)) * 0.1, 
        audioContextRef.current!.currentTime
      );
    }
  };

  const playWinSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Jackpot win sound - ascending notes
    oscillator.type = 'triangle';
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
    
    // Play celebratory ascending scale
    const winNotes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    let time = ctx.currentTime;
    
    winNotes.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, time + index * 0.15);
    });
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 1);
  };

  const playLossSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Loss sound - descending notes
    oscillator.type = 'sawtooth';
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    
    // Play descending "sad" sound
    const lossNotes = [293.66, 246.94, 220, 196]; // D4, B3, A3, G3
    let time = ctx.currentTime;
    
    lossNotes.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, time + index * 0.2);
    });
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.8);
  };

  return {
    toggleMusic,
    setVolume,
    playWinSound,
    playLossSound,
    isPlaying: isPlayingRef.current
  };
};
