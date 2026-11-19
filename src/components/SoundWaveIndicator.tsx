import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const SoundWaveIndicator: React.FC = () => {
  const frame = useCurrentFrame();

  const barCount = 7;
  const bars = Array.from({ length: barCount }, (_, i) => {
    // Wave animation calculated from frame
    const speed = 0.25;
    const wave = Math.sin(frame * speed + i * 0.9);
    const height = interpolate(wave, [-1, 1], [8, 36]);
    return height;
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 16px',
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(74, 222, 128, 0.3)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          height: 38,
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: h,
              borderRadius: 3,
              backgroundColor: i % 2 === 0 ? '#4ADE80' : '#FACC15',
              boxShadow: '0 0 6px rgba(74, 222, 128, 0.5)',
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: '#E2E8F0',
          marginLeft: 8,
          letterSpacing: '0.04em',
        }}
      >
        BAMBANG VOICE
      </span>
    </div>
  );
};
