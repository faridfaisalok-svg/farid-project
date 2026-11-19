import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Character entrance spring
  const charSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const charScale = interpolate(charSpring, [0, 1], [0.75, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Floating idle motion
  const floatY = Math.sin(frame / 14) * 10;
  const floatTilt = Math.sin(frame / 20) * 2;

  // Scene phase: 0-75 Intro, 75-168 Problem Hook
  const isProblemPhase = frame >= 75;

  const problemSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const problemScale = interpolate(problemSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Top Scene Category Badge */}
      <div style={{ marginTop: 150, zIndex: 10 }}>
        <Badge text="TIPS TANAMAN SUBUR" icon="🌱" color="#4ADE80" delay={0} />
      </div>

      {/* Main Headline */}
      <div
        style={{
          marginTop: 28,
          textAlign: 'center',
          padding: '0 40px',
          zIndex: 10,
        }}
      >
        {!isProblemPhase ? (
          <div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif",
                fontSize: 68,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 6px 20px rgba(0,0,0,0.8)',
              }}
            >
              Halo Teman-Teman!
            </h1>
            <div
              style={{
                display: 'inline-block',
                marginTop: 12,
                background: 'linear-gradient(90deg, #FACC15, #FB923C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 72,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(0 4px 15px rgba(250, 204, 21, 0.4))',
              }}
            >
              KENALIN SAYA BAMBANG! 👨‍🌾
            </div>
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${problemScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '2px solid #EF4444',
                padding: '10px 24px',
                borderRadius: 999,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 26 }}>⚠️</span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#F87171',
                  letterSpacing: '0.06em',
                }}
              >
                MASALAH DI PEKARANGAN?
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 66,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.18,
                margin: 0,
                textShadow: '0 6px 25px rgba(0,0,0,0.85)',
              }}
            >
              Punya Tanaman <span style={{ color: '#F87171' }}>Layu</span> &amp;{' '}
              <span style={{ color: '#FCD34D' }}>Susah Tumbuh?</span>
            </h1>
          </div>
        )}
      </div>

      {/* Bambang Character in Center */}
      <div
        style={{
          position: 'absolute',
          bottom: 310,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${charScale}) translateY(${floatY}px) rotate(${floatTilt}deg)`,
          transformOrigin: 'center bottom',
          zIndex: 20,
        }}
      >
        {/* Glow behind character */}
        <div
          style={{
            position: 'absolute',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.35) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Character Image */}
        <Img
          src={staticFile('bambang-1-intro.png')}
          alt="Bambang Petani"
          style={{
            width: 520,
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.75))',
          }}
        />

        {/* Floating Speech/Role Tag */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: -20,
            backgroundColor: '#0F2918',
            border: '2px solid #FACC15',
            borderRadius: 20,
            padding: '10px 22px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 22 }}>🌾</span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: '#FACC15',
            }}
          >
            Petani Organik
          </span>
        </div>
      </div>
    </div>
  );
};
