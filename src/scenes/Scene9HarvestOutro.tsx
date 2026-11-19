import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';
import { Confetti } from '../components/Confetti';

export const Scene9HarvestOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phases:
  // Phase 1 (0-123): Gampang, murah, asyik
  // Phase 2 (123-229): Langsung cobain sekarang
  // Phase 3 (229+): Sampai jumpa bareng Bambang
  const isCtaPhase = frame >= 123;
  const isFarewellPhase = frame >= 229;

  const ctaSpring = spring({
    frame: frame - 123,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const farewellSpring = spring({
    frame: frame - 229,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const farewellScale = interpolate(farewellSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const floatY = Math.sin(frame / 14) * 8;

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
      {/* Celebration Confetti */}
      <Confetti count={40} />

      {/* Top Badge */}
      <div style={{ marginTop: 150, zIndex: 10 }}>
        <Badge text="HASIL PANEN MELIMPAH" icon="🏆" color="#FACC15" delay={0} />
      </div>

      {/* Main Dynamic Headline */}
      <div
        style={{
          marginTop: 20,
          textAlign: 'center',
          padding: '0 40px',
          zIndex: 10,
        }}
      >
        {!isCtaPhase ? (
          <div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 54,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 6px 25px rgba(0,0,0,0.85)',
              }}
            >
              Bertani di Rumah Itu...
            </h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 12,
                marginTop: 14,
              }}
            >
              <span
                style={{
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  padding: '8px 20px',
                  borderRadius: 14,
                }}
              >
                GAMPANG ✅
              </span>
              <span
                style={{
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  padding: '8px 20px',
                  borderRadius: 14,
                }}
              >
                MURAH ✅
              </span>
              <span
                style={{
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  padding: '8px 20px',
                  borderRadius: 14,
                }}
              >
                ASYIK! 🎉
              </span>
            </div>
          </div>
        ) : !isFarewellPhase ? (
          <div
            style={{
              transform: `scale(${ctaScale})`,
              transformOrigin: 'center center',
            }}
          >
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 56,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 6px 25px rgba(0,0,0,0.85)',
              }}
            >
              Yuk Langsung Cobain! 🔥
            </h1>
            <div
              style={{
                marginTop: 14,
                display: 'inline-block',
                background: 'linear-gradient(90deg, #15803D, #22C55E)',
                border: '2.5px solid #86EFAC',
                borderRadius: 24,
                padding: '12px 36px',
                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.45)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 36,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                }}
              >
                🏡 PRAKTIKKAN SEKARANG DI RUMAH!
              </span>
            </div>
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${farewellScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(250, 204, 21, 0.2)',
                border: '2.5px solid #FACC15',
                borderRadius: 24,
                padding: '12px 36px',
                boxShadow: '0 10px 30px rgba(250, 204, 21, 0.4)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 40,
                  fontWeight: 900,
                  color: '#FFE600',
                  letterSpacing: '0.02em',
                }}
              >
                👋 SAMPAI JUMPA BARENG BAMBANG!
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 26,
                fontWeight: 800,
                color: '#86EFAC',
                marginTop: 12,
              }}
            >
              Nantikan tips pertanian seru selanjutnya! 🌾
            </p>
          </div>
        )}
      </div>

      {/* Bambang Character with Veggies Harvest & Thumbs-Up */}
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
          src={staticFile('bambang-4-harvest.png')}
          alt="Bambang Panen Sukses"
          style={{
            width: 490,
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.8))',
          }}
        />
      </div>
    </div>
  );
};
