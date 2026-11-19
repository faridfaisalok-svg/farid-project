import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene4Eggshell: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const elementSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 150 },
  });

  const elementScale = interpolate(elementSpring, [0, 1], [0.75, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const benefitPhase = frame >= 87; // "yang bikin batang dan akar super kokoh"
  const benefitSpring = spring({
    frame: frame - 87,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const benefitScale = interpolate(benefitSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulse = Math.sin(frame / 12) * 0.08 + 1;
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
        <Badge text="NUTRISI ALAMI #1" icon="🥚" color="#FEF3C7" delay={0} />
      </div>

      {/* Main Title */}
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
            fontSize: 60,
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.15,
            margin: 0,
            textShadow: '0 6px 25px rgba(0,0,0,0.85)',
          }}
        >
          Cangkang Telur = <span style={{ color: '#FACC15' }}>Kaya Kalsium!</span>
        </h1>
      </div>

      {/* Nutrient Feature Showcase */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          marginTop: 24,
          zIndex: 15,
          transform: `scale(${elementScale})`,
        }}
      >
        {/* Giant "Ca" Element Block */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
            border: '3px solid #60A5FA',
            boxShadow: '0 0 35px rgba(96, 165, 250, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${pulse})`,
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 54,
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            Ca
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: '#93C5FD',
              letterSpacing: '0.08em',
              marginTop: 4,
            }}
          >
            KALSIUM
          </span>
        </div>

        {/* Benefits list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              backgroundColor: 'rgba(15, 35, 20, 0.9)',
              border: '2px solid #4ADE80',
              borderRadius: 16,
              padding: '10px 22px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            🛡️ Mempertebal Dinding Sel
          </div>
          <div
            style={{
              backgroundColor: 'rgba(15, 35, 20, 0.9)',
              border: '2px solid #FACC15',
              borderRadius: 16,
              padding: '10px 22px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            🌿 Anti Busuk Ujung Daun
          </div>
        </div>
      </div>

      {/* Big Impact Callout (Batang & Akar Super Kokoh) */}
      {benefitPhase && (
        <div
          style={{
            marginTop: 20,
            transform: `scale(${benefitScale})`,
            zIndex: 15,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(90deg, #15803D, #22C55E)',
              border: '2.5px solid #86EFAC',
              borderRadius: 22,
              padding: '12px 36px',
              boxShadow: '0 10px 30px rgba(34, 197, 94, 0.45)',
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 34,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
              }}
            >
              💪 BATANG &amp; AKAR JADI SUPER KOKOH!
            </span>
          </div>
        </div>
      )}

      {/* Bambang Character */}
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
          alt="Bambang"
          style={{
            width: 460,
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.8))',
          }}
        />
      </div>
    </div>
  );
};
