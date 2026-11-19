import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene3Secret: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cards entrance spring
  const card1Spring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const card2Spring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const card1Scale = interpolate(card1Spring, [0, 1], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const card2Scale = interpolate(card2Spring, [0, 1], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Action callout spring at frame 97 (Mulai sekarang kumpulin aja)
  const isCollectPhase = frame >= 97;
  const collectSpring = spring({
    frame: frame - 97,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const collectScale = interpolate(collectSpring, [0, 1], [0.75, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const floatY = Math.sin(frame / 16) * 6;

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
        <Badge text="2 BAHAN AJAIB" icon="✨" color="#FACC15" delay={0} />
      </div>

      {/* Main Headline */}
      <div
        style={{
          marginTop: 20,
          textAlign: 'center',
          padding: '0 40px',
          zIndex: 10,
        }}
      >
        {!isCollectPhase ? (
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 58,
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              margin: 0,
              textShadow: '0 6px 25px rgba(0,0,0,0.85)',
            }}
          >
            Sering Buang Dua Bahan Ini? 🗑️
          </h1>
        ) : (
          <div
            style={{
              transform: `scale(${collectScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: 'linear-gradient(90deg, #16A34A, #22C55E)',
                border: '2.5px solid #86EFAC',
                borderRadius: 24,
                padding: '10px 32px',
                boxShadow: '0 8px 30px rgba(34, 197, 94, 0.4)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                }}
              >
                ✅ MULAI SEKARANG KUMPULIN!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2 Big Visual Cards for Ingredients */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          marginTop: 32,
          zIndex: 15,
        }}
      >
        {/* Card 1: Cangkang Telur */}
        <div
          style={{
            width: 320,
            padding: '24px 20px',
            backgroundColor: 'rgba(12, 33, 18, 0.92)',
            border: '3px solid #FEF3C7',
            borderRadius: 28,
            boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${card1Scale})`,
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 8 }}>🥚</div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 30,
              fontWeight: 900,
              color: '#FEF3C7',
              textAlign: 'center',
            }}
          >
            Cangkang Telur
          </div>
          <div
            style={{
              marginTop: 8,
              backgroundColor: 'rgba(254, 243, 199, 0.2)',
              borderRadius: 12,
              padding: '6px 14px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: '#FACC15',
            }}
          >
            Kaya Kalsium
          </div>
        </div>

        {/* Card 2: Kulit Pisang */}
        <div
          style={{
            width: 320,
            padding: '24px 20px',
            backgroundColor: 'rgba(12, 33, 18, 0.92)',
            border: '3px solid #FDE047',
            borderRadius: 28,
            boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${card2Scale})`,
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 8 }}>🍌</div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 30,
              fontWeight: 900,
              color: '#FDE047',
              textAlign: 'center',
            }}
          >
            Kulit Pisang
          </div>
          <div
            style={{
              marginTop: 8,
              backgroundColor: 'rgba(253, 224, 71, 0.2)',
              borderRadius: 12,
              padding: '6px 14px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: '#FACC15',
            }}
          >
            Sumber Kalium
          </div>
        </div>
      </div>

      {/* Bambang Character with Chicken Coop */}
      <div
        style={{
          position: 'absolute',
          bottom: 310,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateY(${floatY}px)`,
          zIndex: 20,
        }}
      >
        <Img
          src={staticFile('bambang-3-chicken.png')}
          alt="Bambang Peternakan Telur"
          style={{
            width: 480,
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.8))',
          }}
        />
      </div>
    </div>
  );
};
