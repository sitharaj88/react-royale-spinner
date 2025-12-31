import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import WheelCanvas from './WheelCanvas';
import styles from './styles.module.css';
import { useSpinAudio } from './useAudio';
import type { SpinWheelProps, WheelItem } from './types';

// Re-export types for consumers
export type { SpinWheelProps, WheelItem };

export const SpinWheel: React.FC<SpinWheelProps> = ({
    items,
    onSpinFinish,
    size = 300,
    spinDuration = 4,
    className,
    debugResult,
    primaryColor,
    secondaryColor,
    textColor,
    fontFamily,
    fontSize,
    disableSound = false,
    disableConfetti = false,
    rimStyle,
    pointerProps
}) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const controls = useAnimation();
    const [currentRotation, setCurrentRotation] = useState(0);
    const { playTick, playWin } = useSpinAudio();

    // Ref for tracking tick
    const lastTickRef = useRef(-1);

    const handleSpin = async () => {
        if (isSpinning) return;
        setIsSpinning(true);

        // Calculate winning index (random or debug)
        const winningIndex = debugResult !== undefined && debugResult >= 0 && debugResult < items.length
            ? debugResult
            : Math.floor(Math.random() * items.length);

        const anglePerItem = 360 / items.length;
        const centerAngle = anglePerItem * winningIndex + anglePerItem / 2;
        // Note: We use 360 * 5 for minimum 5 spins
        const minSpins = 5;
        const baseRotation = 360 * minSpins;

        let endRotation = 270 - centerAngle;
        // Normalize to be just above current
        while (endRotation < currentRotation + baseRotation) {
            endRotation += 360;
        }

        await controls.start({
            rotate: endRotation,
            transition: {
                duration: spinDuration,
                ease: [0.2, 0.8, 0.2, 1], // Cubic-bezier for "spin up then slow down"
                onUpdate: (latest) => {
                    // Type assertion for latest value if needed, but framer usually passes number if animating number
                    if (typeof latest === 'number') {
                        const currentDeg = latest;
                        // Check crossing lines
                        const segmentCount = Math.floor(currentDeg / anglePerItem);
                        if (segmentCount > lastTickRef.current) {
                            if (!disableSound) playTick();
                            lastTickRef.current = segmentCount;
                        }
                    }
                }
            }
        });

        setCurrentRotation(endRotation);
        setIsSpinning(false);
        if (!disableSound) playWin();

        if (!disableConfetti) {
            // Trigger Confetti
            const rect = document.querySelector(`.${styles.spinWheelContainer}`)?.getBoundingClientRect();
            if (rect) {
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x, y }
                });
            }
        }

        if (onSpinFinish) {
            onSpinFinish(items[winningIndex]);
        }
    };

    // calculate dynamic styles
    const containerStyle = {
        width: size,
        height: size,
        background: primaryColor ? primaryColor : undefined,
        ...rimStyle
    };

    const knobStyle = {
        background: secondaryColor ? secondaryColor : undefined,
    };

    return (
        <div
            className={clsx(styles.spinWheelContainer, className)}
            style={containerStyle}
        >
            {/* Custom or Default Pointer */}
            {pointerProps?.src ? (
                <img
                    src={pointerProps.src}
                    alt="pointer"
                    className={styles.customPointer}
                    style={{ ...pointerProps.style }}
                />
            ) : (
                <div
                    className={styles.pointer}
                    style={{
                        backgroundColor: pointerProps?.color,
                        ...pointerProps?.style
                    }}
                />
            )}

            {/* Wheel */}
            <motion.div
                className={styles.wheelCanvas}
                initial={{ rotate: 0 }}
                animate={controls}
                style={{ width: size, height: size }}
            >
                <WheelCanvas
                    items={items}
                    width={size}
                    height={size}
                    rotation={0}
                    fontFamily={fontFamily}
                    fontSize={fontSize}
                    textColor={textColor}
                />
            </motion.div>

            {/* Center Knob */}
            <button
                className={styles.centerKnob}
                onClick={handleSpin}
                disabled={isSpinning}
                aria-label="Spin the wheel"
                style={knobStyle}
            >
                <span className={styles.spinButton} style={{ fontFamily }}>Spin</span>
            </button>
        </div>
    );
};
