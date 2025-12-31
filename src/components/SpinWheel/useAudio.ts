import { useRef, useCallback, useEffect } from 'react';

export const useSpinAudio = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on user interaction/mount
        // Note: AudioContext needs user interaction to start in some browsers.
        // We'll init it lazily or here if allowed.
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
        }

        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const playTick = useCallback(() => {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        // Randomize pitch slightly for realism
        osc.frequency.setValueAtTime(600 + Math.random() * 50, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, []);

    const playWin = useCallback(() => {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        // Play a major chord (C Major)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            // Stagger start slightly
            const startTime = ctx.currentTime + i * 0.05;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 1.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + 1.5);
        });
    }, []);

    return { playTick, playWin };
};
