import React from 'react';

export interface WheelItem {
    id: string | number;
    label: string;
    color: string;
    textColor?: string;
    style?: React.CSSProperties;
}

export interface SpinWheelProps {
    items: WheelItem[];
    onSpinFinish?: (item: WheelItem) => void;
    size?: number;
    spinDuration?: number; // seconds
    shadowColor?: string;
    className?: string;
    debugResult?: number; // Force specific index for testing

    // Customization Props
    primaryColor?: string; // Outer rim color (default: gold/gradient)
    secondaryColor?: string; // Knob/inner elements
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;

    // Feature flags
    disableSound?: boolean;
    disableConfetti?: boolean;

    // Styling overrides
    rimStyle?: React.CSSProperties;
    pointerProps?: {
        src?: string; // Custom image for pointer
        style?: React.CSSProperties;
        color?: string;
    };
}
