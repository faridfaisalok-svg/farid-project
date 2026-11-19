import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface ConfettiProps {
  count?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ count = 35 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const colors = ['#22C55E', '#FACC15', '#FB923C', '#38BDF8', '#EC4899', '#A855F7'];

  // Seeded deterministic particles
  const particles = Array.from({ length: count }, (_, i) => {
    const x = ((i * 137.5) % width);
    const speed = 4 + (i % 5) * 1.5;
    const size = 12 + (i % 4) * 5;
    const color = colors[i % colors.length];
    const delay = (i * 7) % 60;
    const rotationSpeed = (i % 2 === 0 ? 1 : -1) * (3 + (i % 4));
    return { x, speed, size, color, delay, rotationSpeed };
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 30,
      }}
    >
      {particles.map((p, idx) => {
        const fallDistance = ((frame * p.speed + p.delay * 8) % (height + 200)) - 100;
        const drift = Math.sin((frame + p.delay) / 25) * 40;
        const rotation = (frame * p.rotationSpeed) % 360;
        const opacity = interpolate(
          fallDistance,
          [0, 100, height - 100, height],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: p.x + drift,
              top: fallDistance,
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              borderRadius: 3,
              transform: `rotate(${rotation}deg)`,
              opacity,
              boxShadow: `0 0 10px ${p.color}80`,
            }}
          />
        );
      })}
    </div>
  );
};
