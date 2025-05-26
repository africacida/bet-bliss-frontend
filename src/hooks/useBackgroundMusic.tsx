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
  const backgroundOscillatorsRef = useRef<OscillatorNode[]>([]);
  const backgroundGainRef = useRef<GainNode | null>(null);
  const bassOscillatorRef = useRef<OscillatorNode | null>(null);
  const bassGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const melodyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentThemeRef = useRef<string>(theme);

  useEffect(() => {
    return () => {
      stopAllOscillators();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (melodyTimeoutRef.current) {
        clearTimeout(melodyTimeoutRef.current);
      }
    };
  }, []);

  const stopAllOscillators = () => {
    backgroundOscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    backgroundOscillatorsRef.current = [];
    
    if (bassOscillatorRef.current) {
      try { bassOscillatorRef.current.stop(); } catch (e) {}
      bassOscillatorRef.current = null;
    }
  };

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
          { chord: [261.63, 329.63, 392.00, 493.88], bass: 130.81 }, // C Major 7
          { chord: [220.00, 277.18, 329.63, 415.30], bass: 110.00 }, // A minor 7
          { chord: [293.66, 369.99, 440.00, 554.37], bass: 146.83 }, // D minor 7
          { chord: [196.00, 246.94, 293.66, 369.99], bass: 98.00 },  // G7
        ],
        oscillatorTypes: ['sine', 'triangle', 'sawtooth'] as OscillatorType[],
        chordDuration: 2,
        filterFreq: 1000,
        volumeMultiplier: 0.35,
        bassVolume: 0.4,
        tempo: 120
      },
      jazz: {
        chordProgression: [
          { chord: [261.63, 329.63, 415.30, 523.25], bass: 130.81 }, // C Major 9
          { chord: [220.00, 261.63, 329.63, 440.00], bass: 110.00 }, // A minor 9
          { chord: [293.66, 369.99, 466.16, 587.33], bass: 146.83 }, // D minor 11
          { chord: [196.00, 246.94, 329.63, 415.30], bass: 98.00 },  // G13
        ],
        oscillatorTypes: ['triangle', 'sine', 'sawtooth'] as OscillatorType[],
        chordDuration: 3,
        filterFreq: 1200,
        volumeMultiplier: 0.3,
        bassVolume: 0.5,
        tempo: 100
      },
      electronic: {
        chordProgression: [
          { chord: [130.81, 164.81, 196.00, 261.63], bass: 65.41 }, // C3 Major
          { chord: [146.83, 185.00, 220.00, 293.66], bass: 73.42 }, // D3 Major
          { chord: [174.61, 220.00, 261.63, 349.23], bass: 87.31 }, // F3 Major
          { chord: [196.00, 246.94, 293.66, 392.00], bass: 98.00 }, // G3 Major
        ],
        oscillatorTypes: ['square', 'sawtooth', 'triangle'] as OscillatorType[],
        chordDuration: 1.5,
        filterFreq: 800,
        volumeMultiplier: 0.4,
        bassVolume: 0.6,
        tempo: 128
      },
      ambient: {
        chordProgression: [
          { chord: [65.41, 82.41, 98.00, 130.81], bass: 32.70 }, // C2 Major
          { chord: [73.42, 92.50, 110.00, 146.83], bass: 36.71 }, // D2 Major
          { chord: [87.31, 110.00, 130.81, 174.61], bass: 43.65 }, // F2 Major
          { chord: [98.00, 123.47, 146.83, 196.00], bass: 49.00 }, // G2 Major
        ],
        oscillatorTypes: ['sine', 'triangle', 'sine'] as OscillatorType[],
        chordDuration: 4,
        filterFreq: 600,
        volumeMultiplier: 0.25,
        bassVolume: 0.3,
        tempo: 80
      }
    };
    return themes[selectedTheme as keyof typeof themes] || themes.casino;
  };

  const createRhythmPattern = (ctx: AudioContext, themeConfig: any) => {
    // Create a subtle rhythm using gain modulation
    const rhythmGain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(themeConfig.tempo / 240, ctx.currentTime); // Quarter note rhythm
    lfoGain.gain.setValueAtTime(0.1, ctx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(rhythmGain.gain);
    rhythmGain.gain.setValueAtTime(0.8, ctx.currentTime);
    
    lfo.start();
    
    return rhythmGain;
  };

  const createBackgroundMusic = async () => {
    if (isPlayingRef.current) return;

    const ctx = initAudioContext();
    
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const themeConfig = getThemeConfig(currentThemeRef.current);
    
    // Create main gain and filter
    const mainGain = ctx.createGain();
    const mainFilter = ctx.createBiquadFilter();
    const rhythmGain = createRhythmPattern(ctx, themeConfig);
    
    mainFilter.type = 'lowpass';
    mainFilter.frequency.setValueAtTime(themeConfig.filterFreq, ctx.currentTime);
    mainFilter.Q.setValueAtTime(1, ctx.currentTime);
    
    // Create chord oscillators (4 voices for richer harmony)
    const chordOscillators: OscillatorNode[] = [];
    const chordGains: GainNode[] = [];
    
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = themeConfig.oscillatorTypes[i % themeConfig.oscillatorTypes.length];
      gain.gain.setValueAtTime(0, ctx.currentTime);
      
      osc.connect(gain);
      gain.connect(rhythmGain);
      
      chordOscillators.push(osc);
      chordGains.push(gain);
    }
    
    // Create bass line
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    const bassFilter = ctx.createBiquadFilter();
    
    bassOsc.type = 'sine';
    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(200, ctx.currentTime);
    bassGain.gain.setValueAtTime(0, ctx.currentTime);
    
    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(mainGain);
    
    // Connect everything
    rhythmGain.connect(mainFilter);
    mainFilter.connect(mainGain);
    mainGain.connect(ctx.destination);
    
    // Set volumes
    mainGain.gain.setValueAtTime(0, ctx.currentTime);
    mainGain.gain.exponentialRampToValueAtTime(volume * themeConfig.volumeMultiplier, ctx.currentTime + 0.5);
    bassGain.gain.exponentialRampToValueAtTime(volume * themeConfig.bassVolume, ctx.currentTime + 0.5);
    
    // Store references
    backgroundOscillatorsRef.current = chordOscillators;
    backgroundGainRef.current = mainGain;
    bassOscillatorRef.current = bassOsc;
    bassGainRef.current = bassGain;
    
    const playJammingProgression = () => {
      let time = ctx.currentTime;
      const { chordProgression, chordDuration } = themeConfig;
      
      chordProgression.forEach((chordData, chordIndex) => {
        const chordTime = time + (chordIndex * chordDuration);
        
        // Set chord frequencies
        chordData.chord.forEach((freq: number, voiceIndex: number) => {
          if (chordOscillators[voiceIndex]) {
            chordOscillators[voiceIndex].frequency.setValueAtTime(freq, chordTime);
            
            // Add subtle voice leading and expression
            const targetVolume = (0.15 + Math.sin(voiceIndex * 0.5) * 0.05) * volume;
            chordGains[voiceIndex].gain.setValueAtTime(targetVolume, chordTime);
            
            // Add vibrato for jazz theme
            if (currentThemeRef.current === 'jazz') {
              chordOscillators[voiceIndex].frequency.exponentialRampToValueAtTime(
                freq * 1.01, 
                chordTime + chordDuration * 0.25
              );
              chordOscillators[voiceIndex].frequency.exponentialRampToValueAtTime(
                freq, 
                chordTime + chordDuration * 0.75
              );
            }
            
            // Add filter movement for electronic theme
            if (currentThemeRef.current === 'electronic') {
              mainFilter.frequency.exponentialRampToValueAtTime(
                themeConfig.filterFreq * 1.5,
                chordTime + chordDuration * 0.5
              );
              mainFilter.frequency.exponentialRampToValueAtTime(
                themeConfig.filterFreq,
                chordTime + chordDuration
              );
            }
          }
        });
        
        // Set bass frequency with walking bass line
        if (bassOsc === bassOscillatorRef.current) {
          bassOsc.frequency.setValueAtTime(chordData.bass, chordTime);
          
          // Add walking bass for jazz
          if (currentThemeRef.current === 'jazz' && chordIndex < chordProgression.length - 1) {
            const nextBass = chordProgression[chordIndex + 1].bass;
            const walkingFreq = (chordData.bass + nextBass) / 2;
            bassOsc.frequency.setValueAtTime(walkingFreq, chordTime + chordDuration * 0.75);
          }
        }
      });
      
      // Schedule next progression with slight tempo variation
      if (isPlayingRef.current) {
        const nextDelay = chordProgression.length * chordDuration * 1000;
        const tempoVariation = (Math.random() - 0.5) * 0.1; // ±10% tempo variation
        
        melodyTimeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current && chordOscillators[0] === backgroundOscillatorsRef.current[0]) {
            playJammingProgression();
          }
        }, nextDelay * (1 + tempoVariation));
      }
    };
    
    // Start all oscillators
    chordOscillators.forEach(osc => osc.start());
    bassOsc.start();
    playJammingProgression();
    isPlayingRef.current = true;
    
    console.log(`Jamming background music started - ${currentThemeRef.current} theme with enhanced harmony and rhythm`);
  };

  const stopBackgroundMusic = () => {
    if (isPlayingRef.current) {
      stopAllOscillators();
      backgroundGainRef.current = null;
      bassGainRef.current = null;
      isPlayingRef.current = false;
      
      if (melodyTimeoutRef.current) {
        clearTimeout(melodyTimeoutRef.current);
        melodyTimeoutRef.current = null;
      }
      
      console.log('Jamming background music stopped');
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
    if (bassGainRef.current && audioContextRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      const themeConfig = getThemeConfig(currentThemeRef.current);
      bassGainRef.current.gain.setValueAtTime(
        clampedVolume * themeConfig.bassVolume, 
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
    
    oscillator.type = 'triangle';
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    
    const winNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
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
    
    oscillator.type = 'sawtooth';
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
    
    const lossNotes = [392.00, 349.23, 293.66, 246.94];
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
