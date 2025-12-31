import React, { useMemo } from 'react';
import styles from './styles.module.css';
import type { WheelItem } from './types';

interface WheelCanvasProps {
    items: WheelItem[];
    width: number;
    height: number;
    rotation: number;
    fontFamily?: string;
    fontSize?: number;
    textColor?: string;
}

const WheelCanvas: React.FC<WheelCanvasProps> = ({
    items,
    width,
    height,
    rotation,
    fontFamily = "'Arial', sans-serif",
    fontSize,
    textColor = "#fff"
}) => {
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate coordinates for a point on the circle
    const getCoordinatesForPercent = (percent: number) => {
        const x = centerX + radius * Math.cos(2 * Math.PI * percent);
        const y = centerY + radius * Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    const segments = useMemo(() => {
        let cumulativePercent = 0;
        const percentPerItem = 1 / items.length;

        return items.map((item, index) => {
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percentPerItem;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

            // Large arc flag: if percentPerItem > 0.5, then 1, else 0
            const largeArcFlag = percentPerItem > 0.5 ? 1 : 0;

            // Path data
            const pathData = [
                `M ${centerX} ${centerY}`, // Move to center
                `L ${startX} ${startY}`,   // Line to start
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                'Z' // Close path
            ].join(' ');

            // Calculate text position (midpoint angle)
            const midAngle = 2 * Math.PI * (index * percentPerItem + percentPerItem / 2);
            const textRadius = radius * 0.65; // Place text at 65% of radius
            const textX = centerX + textRadius * Math.cos(midAngle);
            const textY = centerY + textRadius * Math.sin(midAngle);

            // Calculate rotation for text to be readable
            const rotateAngle = (midAngle * 180) / Math.PI;

            return {
                pathData,
                textX,
                textY,
                rotateAngle,
                item
            };
        });
    }, [items, radius, centerX, centerY]);

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={styles.wheelCanvas}
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            {/* Premium Shine Overlay Effect */}
            <circle cx={centerX} cy={centerY} r={radius} fill="url(#shineGradient)" style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }} />
            <defs>
                <radialGradient id="shineGradient">
                    <stop offset="50%" stopColor="white" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.5)" />
                </filter>
            </defs>

            {segments.map((segment, i) => (
                <g key={segment.item.id || i}>
                    <path
                        d={segment.pathData}
                        fill={segment.item.color}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                    />
                    {/* Inner highlight for 3D effect */}
                    <path
                        d={segment.pathData}
                        fill="none"
                        stroke="rgba(0,0,0,0.1)"
                        strokeWidth="4"
                        transform={`scale(0.95)`}
                        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                    />

                    <text
                        x={segment.textX}
                        y={segment.textY}
                        fill={segment.item.textColor || textColor}
                        fontSize={fontSize || (items.length > 8 ? 12 : 14)}
                        fontWeight="800"
                        fontFamily={fontFamily}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${segment.rotateAngle}, ${segment.textX}, ${segment.textY})`}
                        style={{
                            textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                            pointerEvents: 'none',
                            userSelect: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {segment.item.label}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default WheelCanvas;
