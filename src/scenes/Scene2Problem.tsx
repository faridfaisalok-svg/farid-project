import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const sceneSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const headlineScale = interpolate(sceneSpring, [0, 1], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulse animation for secret reveal
  const isRevealPhase = frame >= 80;
  const revealSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const revealScale = interpolate(revealSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const floatY = Math.sin(frame / 15) * 8;

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
      {/* Top Badge */}
      <div style={{ marginTop: 150, zIndex: 10 }}>
        <Badge text="RAHASIA ORGANIK" icon="💡" color="#FACC15" delay={0} />
      </div>

      {/* Dynamic Headline Area */}
      <div
        style={{
          marginTop: 24,
          textAlign: 'center',
          padding: '0 44px',
          zIndex: 10,
          transform: `scale(${headlineScale})`,
        }}
      >
        {!isRevealPhase ? (
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'rgba(250, 204, 21, 0.2)',
                border: '2px solid #FACC15',
                borderRadius: 999,
                padding: '8px 22px',
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 24 }}>💪</span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#FACC15',
                }}
              >
                JANGAN BURU-BURU MENYERAH!
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 64,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 6px 25px rgba(0,0,0,0.85)',
              }}
            >
              Hari Ini Saya Mau <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #4ADE80, #FACC15)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Bongkar Rahasianya! 🔥
              </span>
            </h1>
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${revealScale})`,
              transformOrigin: 'center center',
            }}
          >
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 62,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 6px 25px rgba(0,0,0,0.85)',
              }}
            >
              Bikin Tanaman <span style={{ color: '#4ADE80' }}>Subur Lebat</span>
            </h1>
            <div
              style={{
                marginTop: 14,
                display: 'inline-block',
                background: 'rgba(234, 179, 8, 0.25)',
                border: '2.5px solid #FACC15',
                borderRadius: 24,
                padding: '12px 32px',
                boxShadow: '0 8px 30px rgba(250, 204, 21, 0.3)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 44,
                  fontWeight: 900,
                  color: '#FFE600',
                  letterSpacing: '0.02em',
                }}
              >
                ✨ HANYA SISA DAPUR! ✨
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Visual Center: Floating Feature Pills + Bambang */}
      <div
        style={{
          position: 'absolute',
          bottom: 310,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `translateY(${floatY}px)`,
          zIndex: 20,
        }}
      >
        {/* Floating Perks */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 20,
            zIndex: 25,
          }}
        >
          <div
            style={{
              background: 'rgba(5, 25, 12, 0.9)',
              border: '1.5px solid #4ADE80',
              borderRadius: 18,
              padding: '10px 20px',
              color: '#FFFFFF',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>💰</span> Biaya Rp 0,-
          </div>
          <div
            style={{
              background: 'rgba(5, 25, 12, 0.9)',
              border: '1.5px solid #FACC15',
              borderRadius: 18,
              padding: '10px 20px',
              color: '#FFFFFF',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>♻️</span> 100% Organik
          </div>
        </div>

        {/* Character Image */}
        <div style={{ position: 'relative' }}>
          <Img
            src={staticFile('bambang-1-intro.png')}
            alt="Bambang"
            style={{
              width: 500,
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.8))',
            }}
          />
        </div>
      </div>
    </div>
  );
};
