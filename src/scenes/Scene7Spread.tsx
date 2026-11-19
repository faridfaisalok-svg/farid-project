import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene7Spread: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stepSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const stepScale = interpolate(stepSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isRootFocus = frame >= 100;
  const rootSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const rootScale = interpolate(rootSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const floatY = Math.sin(frame / 16) * 6;

  // Sprinkling particles animation
  const sprinkleParticles = Array.from({ length: 16 }, (_, i) => {
    const xOffset = -140 + (i * 20);
    const speed = 2 + (i % 3);
    const yOffset = ((frame * speed + i * 15) % 120);
    return { xOffset, yOffset, opacity: interpolate(yOffset, [0, 90, 120], [0.9, 0.9, 0]) };
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
        <Badge text="LANGKAH APLIKASI" icon="🪴" color="#FACC15" delay={0} />
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
          Taburkan Bubuknya <span style={{ color: '#4ADE80' }}>Secara Merata!</span>
        </h1>
      </div>

      {/* Step 3 Card */}
      <div
        style={{
          marginTop: 26,
          width: 820,
          transform: `scale(${stepScale})`,
          zIndex: 15,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(12, 33, 18, 0.95)',
            border: '2.5px solid #FACC15',
            borderRadius: 24,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              backgroundColor: '#FACC15',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 34,
              fontWeight: 900,
              color: '#1E293B',
            }}
          >
            3
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: '#FACC15',
                textTransform: 'uppercase',
              }}
            >
              Langkah Ketiga: Taburkan 🪴
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: '#FFFFFF',
              }}
            >
              Taburkan serpihan secara merata di permukaan tanah!
            </div>
          </div>
        </div>
      </div>

      {/* Target Focus Ring Card */}
      {isRootFocus && (
        <div
          style={{
            marginTop: 18,
            transform: `scale(${rootScale})`,
            zIndex: 15,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(90deg, #15803D, #22C55E)',
              border: '2px solid #86EFAC',
              borderRadius: 20,
              padding: '12px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 8px 30px rgba(34, 197, 94, 0.4)',
            }}
          >
            <span style={{ fontSize: 28 }}>🎯</span>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 30,
                fontWeight: 900,
                color: '#FFFFFF',
              }}
            >
              FOKUS: Tepat di Sekitar Area Akar!
            </span>
          </div>
        </div>
      )}

      {/* Bambang Character & Sprinkling Animation */}
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
          alt="Tabur Bubuk"
          style={{
            width: 480,
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.8))',
          }}
        />

        {/* Sprinkle powder particles */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 80,
            width: 300,
            height: 120,
            pointerEvents: 'none',
          }}
        >
          {sprinkleParticles.map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 150 + p.xOffset,
                top: p.yOffset,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: i % 2 === 0 ? '#FEF3C7' : '#FDE047',
                opacity: p.opacity,
                boxShadow: '0 0 6px rgba(254, 243, 199, 0.8)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
