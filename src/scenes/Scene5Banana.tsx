import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene5Banana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elementSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 150 },
  });

  const elementScale = interpolate(elementSpring, [0, 1], [0.75, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fruitPhase = frame >= 101; // "buat merangsang bunga dan buah biar cepat muncul"
  const fruitSpring = spring({
    frame: frame - 101,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const fruitScale = interpolate(fruitSpring, [0, 1], [0.8, 1], {
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
        <Badge text="NUTRISI ALAMI #2" icon="🍌" color="#FACC15" delay={0} />
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
            fontSize: 58,
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.15,
            margin: 0,
            textShadow: '0 6px 25px rgba(0,0,0,0.85)',
          }}
        >
          Kulit Pisang = <span style={{ color: '#FDE047' }}>Sumber Kalium!</span>
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
        {/* Giant "K" Element Block */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #B45309, #F59E0B)',
            border: '3px solid #FDE047',
            boxShadow: '0 0 35px rgba(251, 191, 36, 0.55)',
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
              fontSize: 58,
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            K
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: '#FEF08A',
              letterSpacing: '0.08em',
              marginTop: 4,
            }}
          >
            KALIUM
          </span>
        </div>

        {/* Benefits list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              backgroundColor: 'rgba(25, 20, 10, 0.9)',
              border: '2px solid #F59E0B',
              borderRadius: 16,
              padding: '10px 22px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            🌸 Rangsang Pembungaan
          </div>
          <div
            style={{
              backgroundColor: 'rgba(25, 20, 10, 0.9)',
              border: '2px solid #22C55E',
              borderRadius: 16,
              padding: '10px 22px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            🍅 Buah Cepat Muncul &amp; Manis
          </div>
        </div>
      </div>

      {/* Big Impact Callout */}
      {fruitPhase && (
        <div
          style={{
            marginTop: 20,
            transform: `scale(${fruitScale})`,
            zIndex: 15,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(90deg, #D97706, #EA580C)',
              border: '2.5px solid #FDE047',
              borderRadius: 22,
              padding: '12px 36px',
              boxShadow: '0 10px 30px rgba(234, 88, 12, 0.45)',
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
              ⚡ BUNGA &amp; BUAH CEPAT MUNCUL!
            </span>
          </div>
        </div>
      )}

      {/* Bambang Character with Veggies Harvest */}
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
          alt="Bambang Panen"
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
