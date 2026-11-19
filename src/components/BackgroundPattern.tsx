import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface BackgroundPatternProps {
  theme?: 'green' | 'warm' | 'darkGreen' | 'fresh';
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  theme = 'green',
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Gentle rotation for sunburst rays
  const rayRotation = interpolate(frame, [0, 600], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'extend',
  });

  // Pulse animation for subtle glow
  const pulse = Math.sin(frame / 20) * 0.15 + 0.85;

  let bgGradient = 'radial-gradient(circle at 50% 35%, #15803D 0%, #052E16 65%, #021B0B 100%)';
  let rayColor = 'rgba(74, 222, 128, 0.04)';
  let accentCircle = 'rgba(250, 204, 21, 0.15)';

  if (theme === 'warm') {
    bgGradient = 'radial-gradient(circle at 50% 35%, #854D0E 0%, #361F04 65%, #1A0D02 100%)';
    rayColor = 'rgba(251, 146, 60, 0.05)';
    accentCircle = 'rgba(251, 191, 36, 0.18)';
  } else if (theme === 'darkGreen') {
    bgGradient = 'radial-gradient(circle at 50% 40%, #0F3E22 0%, #061D10 70%, #020C06 100%)';
    rayColor = 'rgba(34, 197, 94, 0.035)';
    accentCircle = 'rgba(52, 211, 153, 0.12)';
  } else if (theme === 'fresh') {
    bgGradient = 'radial-gradient(circle at 50% 30%, #166534 0%, #0D371E 60%, #04170C 100%)';
    rayColor = 'rgba(134, 239, 172, 0.045)';
    accentCircle = 'rgba(74, 222, 128, 0.2)';
  }

  // Pre-calculated floating organic particles
  const particles = [
    { x: 120, y: 350, r: 8, speed: 1.2, delay: 0 },
    { x: 920, y: 280, r: 12, speed: 0.9, delay: 40 },
    { x: 200, y: 1100, r: 6, speed: 1.5, delay: 80 },
    { x: 860, y: 950, r: 10, speed: 1.1, delay: 120 },
    { x: 150, y: 1650, r: 14, speed: 0.8, delay: 160 },
    { x: 950, y: 1520, r: 8, speed: 1.3, delay: 200 },
    { x: 500, y: 800, r: 5, speed: 1.4, delay: 240 },
    { x: 340, y: 1350, r: 9, speed: 1.0, delay: 280 },
    { x: 740, y: 550, r: 11, speed: 1.1, delay: 320 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        background: bgGradient,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Rotating Sunburst Rays */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          width: 2600,
          height: 2600,
          marginLeft: -1300,
          marginTop: -1300,
          transform: `rotate(${rayRotation}deg)`,
          background: `repeating-conic-gradient(from 0deg, ${rayColor} 0deg 15deg, transparent 15deg 30deg)`,
          opacity: 0.8,
        }}
      />

      {/* Center ambient glow circle */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          left: '50%',
          width: 900,
          height: 900,
          marginLeft: -450,
          marginTop: -450,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentCircle} 0%, transparent 70%)`,
          transform: `scale(${pulse})`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const floatY = ((frame * p.speed + p.delay * 3) % (height + 100)) - 50;
        const actualY = height - floatY; // Float upwards
        const floatX = p.x + Math.sin((frame + p.delay) / 30) * 25;
        const opacity = interpolate(
          actualY,
          [0, 150, height - 150, height],
          [0, 0.6, 0.6, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: floatX,
              top: actualY,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: '50%',
              backgroundColor: 'rgba(250, 204, 21, 0.4)',
              boxShadow: '0 0 16px rgba(250, 204, 21, 0.6)',
              opacity,
            }}
          />
        );
      })}

      {/* Grid Pattern overlay for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.035) 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px',
          opacity: 0.6,
        }}
      />

      {/* Vignette Shadow Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(2, 10, 5, 0.75) 100%)',
        }}
      />
    </div>
  );
};
