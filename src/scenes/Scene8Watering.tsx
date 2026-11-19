import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene8Watering: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Phases:
  // Phase 1 (0-107): Siram air
  // Phase 2 (107-212): Tanah gembur
  // Phase 3 (212+): Daun lebih hijau & segar
  const isSoilPhase = frame >= 107;
  const isLeafPhase = frame >= 212;

  const soilSpring = spring({
    frame: frame - 107,
    fps,
    config: { damping: 11, stiffness: 170 },
  });
  const soilScale = interpolate(soilSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leafSpring = spring({
    frame: frame - 212,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const leafScale = interpolate(leafSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const floatY = Math.sin(frame / 15) * 6;

  // Animated falling water drops
  const waterDrops = Array.from({ length: 12 }, (_, i) => {
    const speed = 6 + (i % 4);
    const dropY = ((frame * speed + i * 22) % 180);
    const dropX = -60 + (i * 12);
    const opacity = interpolate(dropY, [0, 140, 180], [0.9, 0.9, 0]);
    return { dropX, dropY, opacity };
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
      {/* Top Badge */}
      <div style={{ marginTop: 150, zIndex: 10 }}>
        <Badge text="PROSES PENYERAPAN" icon="💧" color="#38BDF8" delay={0} />
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
        {!isLeafPhase ? (
          <div>
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
              Siram Air: Nutrisi <span style={{ color: '#38BDF8' }}>Meresap!</span>
            </h1>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 30,
                fontWeight: 700,
                color: '#CBD5E1',
                marginTop: 10,
              }}
            >
              Nutrisi menyebar ke seluruh rongga tanah 🌿
            </p>
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${leafScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div
              style={{
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
                  fontSize: 42,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                }}
              >
                ✨ DAUN JADI LEBIH HIJAU &amp; SEGAR!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Benefits Badges Container */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 24,
          zIndex: 15,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(10, 30, 20, 0.92)',
            border: '2px solid #38BDF8',
            borderRadius: 18,
            padding: '12px 24px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: '#FFFFFF',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span>💧</span> Nutrisi Perlahan Meresap
        </div>

        {isSoilPhase && (
          <div
            style={{
              transform: `scale(${soilScale})`,
              backgroundColor: 'rgba(10, 30, 20, 0.92)',
              border: '2px solid #FACC15',
              borderRadius: 18,
              padding: '12px 24px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span>🪴</span> Media Makin Gembur
          </div>
        )}
      </div>

      {/* Bambang Watering Sprout Plants */}
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
          src={staticFile('bambang-2-watering.png')}
          alt="Bambang Menyiram Tanaman"
          style={{
            width: 480,
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.8))',
          }}
        />

        {/* Animated Water Droplets from Can */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 100,
            width: 150,
            height: 180,
            pointerEvents: 'none',
          }}
        >
          {waterDrops.map((d, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 80 + d.dropX,
                top: d.dropY,
                width: 6,
                height: 12,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                backgroundColor: '#38BDF8',
                opacity: d.opacity,
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.8)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
