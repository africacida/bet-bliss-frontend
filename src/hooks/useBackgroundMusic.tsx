
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
  const melodyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (backgroundOscillatorRef.current) {
        backgroundOscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (melodyTimeoutRef.current) {
        clearTimeout(melodyTimeoutRef.current);
      }
    };
  }, []);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const createBackgroundMusic = async () => {
    if (isPlayingRef.current) return;

    const ctx = initAudioContext();
    
    // Resume context if suspended (required for autoplay policy)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    // Create a more complex casino-style background music
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();
    
    // Set up filter for a warmer sound
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(800, ctx.currentTime);
    
    // Main melody oscillator
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
    
    // Harmony oscillator
    oscillator2.type = 'triangle';
    oscillator2.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
    
    // Set volume (make it more audible)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.4, ctx.currentTime + 0.5);
    
    // Connect nodes
    oscillator1.connect(filterNode);
    oscillator2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    backgroundOscillatorRef.current = oscillator1;
    backgroundGainRef.current = gainNode;
    
    // Casino chord progression (C - F - G - C)
    const chordProgression = [
      { note1: 261.63, note2: 329.63 }, // C Major
      { note1: 349.23, note2: 440.00 }, // F Major  
      { note1: 392.00, note2: 493.88 }, // G Major
      { note1: 261.63, note2: 329.63 }, // C Major
    ];
    
    const playChordProgression = () => {
      let time = ctx.currentTime;
      const chordDuration = 2; // 2 seconds per chord
      
      chordProgression.forEach((chord, index) => {
        const chordTime = time + (index * chordDuration);
        oscillator1.frequency.setValueAtTime(chord.note1, chordTime);
        oscillator2.frequency.setValueAtTime(chord.note2, chordTime);
      });
      
      // Schedule next progression
      if (isPlayingRef.current) {
        melodyTimeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current && oscillator1 === backgroundOscillatorRef.current) {
            playChordProgression();
          }
        }, chordProgression.length * chordDuration * 1000);
      }
    };
    
    oscillator1.start();
    oscillator2.start();
    playChordProgression();
    isPlayingRef.current = true;
    
    console.log('Background music started playing');
  };

  const stopBackgroundMusic = () => {
    if (backgroundOscillatorRef.current && isPlayingRef.current) {
      backgroundOscillatorRef.current.stop();
      backgroundOscillatorRef.current = null;
      backgroundGainRef.current = null;
      isPlayingRef.current = false;
      
      if (melodyTimeoutRef.current) {
        clearTimeout(melodyTimeoutRef.current);
        melodyTimeoutRef.current = null;
      }
      
      console.log('Background music stopped');
    }
  };

  useEffect(() => {
    if (isPlaying) {
      createBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [isPlaying, volume]);

  const toggleMusic = async () => {
    if (isPlayingRef.current) {
      stopBackgroundMusic();
    } else {
      await createBackgroundMusic();
    }
  };

  const setVolume = (newVolume: number) => {
    if (backgroundGainRef.current && audioContextRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      backgroundGainRef.current.gain.setValueAtTime(
        clampedVolume * 0.4, 
        audioContextRef.current.currentTime
      );
    }
  };

  const playWinSound = async () => {
    const ctx = initAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Jackpot win sound - celebratory ascending notes
    oscillator.type = 'triangle';
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    
    // Play celebratory ascending scale
    const winNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    let time = ctx.currentTime;
    
    winNotes.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, time + index * 0.15);
    });
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 1.5);
    
    console.log('Win sound played');
  };

  const playLossSound = async () => {
    const ctx = initAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Loss sound - descending "disappointed" notes
    oscillator.type = 'sawtooth';
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
    
    // Play descending "sad" sound
    const lossNotes = [392.00, 349.23, 293.66, 246.94]; // G4, F4, D4, B3
    let time = ctx.currentTime;
    
    lossNotes.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, time + index * 0.3);
    });
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 1.2);
    
    console.log('Loss sound played');
  };

  return {
    toggleMusic,
    setVolume,
    playWinSound,
    playLossSound,
    isPlaying: isPlayingRef.current
  };
};
