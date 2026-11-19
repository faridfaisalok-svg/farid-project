import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';

export const Scene6HowToSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 57 ("Cara pakainya gampang banget")
  // Phase 2: 57 - 165 ("Jemur sampai benar-benar kering")
  // Phase 3: 165+ ("lalu tumbuk sampai hancur serpihan kecil")
  const isStep1 = frame >= 57;
  const isStep2 = frame >= 165;

  const step1Spring = spring({
    frame: frame - 57,
    fps,
    config: { damping: 12, stiffness: 170 },
  });
  const step1Scale = interpolate(step1Spring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const step2Spring = spring({
    frame: frame - 165,
    fps,
    config: { damping: 12, stiffness: 170 },
  });
  const step2Scale = interpolate(step2Spring, [0, 1], [0.8, 1], {
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
        <Badge text="PANDUAN PEMBUATAN" icon="🛠️" color="#4ADE80" delay={0} />
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
          Cara Pakainya <span style={{ color: '#FACC15' }}>Gampang Banget!</span>
        </h1>
      </div>

      {/* Step Cards Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          marginTop: 28,
          zIndex: 15,
          width: 820,
        }}
      >
        {/* Step 1 Card */}
        {isStep1 && (
          <div
            style={{
              transform: `scale(${step1Scale})`,
              backgroundColor: 'rgba(12, 33, 18, 0.95)',
              border: '2.5px solid #FACC15',
              borderRadius: 22,
              padding: '18px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: '#FACC15',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 32,
                fontWeight: 900,
                color: '#1E293B',
              }}
            >
              1
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
                Langkah Pertama: Jemur ☀️
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#FFFFFF',
                }}
              >
                Jemur cangkang &amp; kulit pisang sampai KERING TOTAL!
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Card */}
        {isStep2 && (
          <div
            style={{
              transform: `scale(${step2Scale})`,
              backgroundColor: 'rgba(12, 33, 18, 0.95)',
              border: '2.5px solid #4ADE80',
              borderRadius: 22,
              padding: '18px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: '#4ADE80',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 32,
                fontWeight: 900,
                color: '#064E3B',
              }}
            >
              2
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#4ADE80',
                  textTransform: 'uppercase',
                }}
              >
                Langkah Kedua: Tumbuk 🔨
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#FFFFFF',
                }}
              >
                Tumbuk hingga hancur jadi serpihan kecil halus!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bambang Character Kneeling with Garden Soil */}
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
          alt="Bambang Praktik Berkebun"
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
