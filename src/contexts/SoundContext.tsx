import React, { createContext, useContext, useCallback } from 'react';

interface SoundContextType {
  playSound: (type: 'click' | 'success' | 'add' | 'remove' | 'select') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: React.ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  // Create sound using Web Audio API for better performance
  const createAudioContext = useCallback(() => {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    return new AudioContext();
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const audioContext = createAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch {
      // Fallback: silent if audio context fails
      console.log('Audio not available');
    }
  }, [createAudioContext]);

  const playSound = useCallback((type: 'click' | 'success' | 'add' | 'remove' | 'select') => {
    switch (type) {
      case 'click':
        playBeep(800, 0.1, 'sine');
        break;
      case 'success':
        playBeep(440, 0.2, 'sine');
        setTimeout(() => playBeep(554, 0.2, 'sine'), 100);
        setTimeout(() => playBeep(659, 0.3, 'sine'), 200);
        break;
      case 'add':
        playBeep(523, 0.15, 'triangle');
        setTimeout(() => playBeep(659, 0.15, 'triangle'), 75);
        break;
      case 'remove':
        playBeep(400, 0.2, 'triangle');
        break;
      case 'select':
        playBeep(600, 0.1, 'square');
        break;
    }
  }, [playBeep]);

  return (
    <SoundContext.Provider value={{ playSound }}>
      {children}
    </SoundContext.Provider>
  );
};