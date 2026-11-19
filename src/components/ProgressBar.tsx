import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const progressPercent = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  const totalSeconds = Math.floor(durationInFrames / fps);
  const currentSeconds = Math.floor(frame / fps);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '30px 48px 0 48px',
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1.5px solid rgba(74, 222, 128, 0.4)',
            borderRadius: 30,
            padding: '8px 20px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ fontSize: 20 }}>🌿</span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: '#4ADE80',
              letterSpacing: '0.04em',
            }}
          >
            TIPS BERKEBUN BAMBANG
          </span>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1.5px solid rgba(250, 204, 21, 0.4)',
            borderRadius: 30,
            padding: '8px 18px',
            fontFamily: "'Plus Jakarta Sans', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: '#FACC15',
            backdropFilter: 'blur(8px)',
          }}
        >
          {formatTime(currentSeconds)} / {formatTime(totalSeconds)}
        </div>
      </div>

      {/* Progress Track */}
      <div
        style={{
          width: '100%',
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        {/* Fill */}
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #22C55E 0%, #FACC15 80%, #FB923C 100%)',
            boxShadow: '0 0 12px rgba(250, 204, 21, 0.8)',
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
};
