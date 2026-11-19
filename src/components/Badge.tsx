import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface BadgeProps {
  text: string;
  icon?: string;
  color?: string;
  delay?: number;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  icon,
  color = '#22C55E',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const scale = interpolate(entrance, [0, 1], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(entrance, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 28px',
        borderRadius: 9999,
        backgroundColor: 'rgba(10, 25, 15, 0.85)',
        border: `2px solid ${color}`,
        boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${color}40`,
        backdropFilter: 'blur(10px)',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {icon && <span style={{ fontSize: 28 }}>{icon}</span>}
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Montserrat', -apple-system, sans-serif",
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          textShadow: '0 2px 4px rgba(0,0,0,0.6)',
        }}
      >
        {text}
      </span>
    </div>
  );
};
