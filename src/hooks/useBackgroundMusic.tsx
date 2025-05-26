
import { useEffect, useRef } from 'react';

interface UseBackgroundMusicProps {
  isPlaying?: boolean;
  volume?: number;
  theme?: 'casino' | 'jazz' | 'electronic' | 'ambient';
}

export const useBackgroundMusic = ({ 
  isPlaying = true, 
  volume = 0.3, 
  theme = 'casino' 
}: UseBackgroundMusicProps = {}) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundOscillatorRef = useRef<OscillatorNode | null>(null);
  const backgroundGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const melodyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentThemeRef = useRef<string>(theme);

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

  const getThemeConfig = (selectedTheme: string) => {
    const themes = {
      casino: {
        chordProgression: [
          { note1: 261.63, note2: 329.63 }, // C Major
          { note1: 349.23, note2: 440.00 }, // F Major  
          { note1: 392.00, note2: 493.88 }, // G Major
          { note1: 261.63, note2: 329.63 }, // C Major
        ],
        oscillatorTypes: ['sine', 'triangle'] as OscillatorType[],
        chordDuration: 2,
        filterFreq: 800,
        volumeMultiplier: 0.4
      },
      jazz: {
        chordProgression: [
          { note1: 261.63, note2: 369.99 }, // C Major 7
          { note1: 220.00, note2: 329.63 }, // A minor 7
          { note1: 293.66, note2: 440.00 }, // D minor 7
          { note1: 392.00, note2: 493.88 }, // G7
        ],
        oscillatorTypes: ['triangle', 'sawtooth'] as OscillatorType[],
        chordDuration: 3,
        filterFreq: 1200,
        volumeMultiplier: 0.3
      },
      electronic: {
        chordProgression: [
          { note1: 130.81, note2: 196.00 }, // C3, G3
          { note1: 146.83, note2: 220.00 }, // D3, A3
          { note1: 174.61, note2: 261.63 }, // F3, C4
          { note1: 196.00, note2: 293.66 }, // G3, D4
        ],
        oscillatorTypes: ['square', 'sawtooth'] as OscillatorType[],
        chordDuration: 1.5,
        filterFreq: 600,
        volumeMultiplier: 0.35
      },
      ambient: {
        chordProgression: [
          { note1: 65.41, note2: 98.00 }, // C2, G2
          { note1: 73.42, note2: 110.00 }, // D2, A2
          { note1: 87.31, note2: 130.81 }, // F2, C3
          { note1: 98.00, note2: 146.83 }, // G2, D3
        ],
        oscillatorTypes: ['sine', 'triangle'] as OscillatorType[],
        chordDuration: 4,
        filterFreq: 400,
        volumeMultiplier: 0.25
      }
    };
    return themes[selectedTheme as keyof typeof themes] || themes.casino;
  };

  const createBackgroundMusic = async () => {
    if (isPlayingRef.current) return;

    const ctx = initAudioContext();
    
    // Resume context if suspended (required for autoplay policy)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const themeConfig = getThemeConfig(currentThemeRef.current);
    
    // Create oscillators and effects based on theme
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();
    
    // Set up filter for theme-specific sound
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(themeConfig.filterFreq, ctx.currentTime);
    
    // Set oscillator types based on theme
    oscillator1.type = themeConfig.oscillatorTypes[0];
    oscillator2.type = themeConfig.oscillatorTypes[1];
    
    // Set initial frequencies
    oscillator1.frequency.setValueAtTime(themeConfig.chordProgression[0].note1, ctx.currentTime);
    oscillator2.frequency.setValueAtTime(themeConfig.chordProgression[0].note2, ctx.currentTime);
    
    // Set volume
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume * themeConfig.volumeMultiplier, ctx.currentTime + 0.5);
    
    // Connect nodes
    oscillator1.connect(filterNode);
    oscillator2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    backgroundOscillatorRef.current = oscillator1;
    backgroundGainRef.current = gainNode;
    
    const playChordProgression = () => {
      let time = ctx.currentTime;
      const { chordProgression, chordDuration } = themeConfig;
      
      chordProgression.forEach((chord, index) => {
        const chordTime = time + (index * chordDuration);
        oscillator1.frequency.setValueAtTime(chord.note1, chordTime);
        oscillator2.frequency.setValueAtTime(chord.note2, chordTime);
        
        // Add subtle vibrato for jazz theme
        if (currentThemeRef.current === 'jazz') {
          oscillator1.frequency.exponentialRampToValueAtTime(
            chord.note1 * 1.02, 
            chordTime + chordDuration * 0.3
          );
          oscillator1.frequency.exponentialRampToValueAtTime(
            chord.note1, 
            chordTime + chordDuration * 0.6
          );
        }
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
    
    console.log(`Background music started playing - ${currentThemeRef.current} theme`);
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
    // Update theme if it changed
    if (currentThemeRef.current !== theme) {
      currentThemeRef.current = theme;
      if (isPlayingRef.current) {
        stopBackgroundMusic();
        createBackgroundMusic();
      }
    }
  }, [theme]);

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
      const themeConfig = getThemeConfig(currentThemeRef.current);
      backgroundGainRef.current.gain.setValueAtTime(
        clampedVolume * themeConfig.volumeMultiplier, 
        audioContextRef.current.currentTime
      );
    }
  };

  const changeTheme = (newTheme: string) => {
    currentThemeRef.current = newTheme;
    if (isPlayingRef.current) {
      stopBackgroundMusic();
      createBackgroundMusic();
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
    changeTheme,
    playWinSound,
    playLossSound,
    isPlaying: isPlayingRef.current,
    currentTheme: currentThemeRef.current
  };
};
