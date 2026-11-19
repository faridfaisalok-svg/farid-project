import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, SubtitleCue } from '../constants';

interface KineticSubtitleProps {
  cue: SubtitleCue | null;
}

export const KineticSubtitle: React.FC<KineticSubtitleProps> = ({ cue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!cue) return null;

  const { text, startFrame, endFrame, highlightWords = [], highlightColor = COLORS.accentYellow } = cue;
  const duration = endFrame - startFrame;
  const progressInCue = Math.max(0, Math.min(1, (frame - startFrame) / Math.max(1, duration)));

  const words = text.split(' ');
  const totalWords = words.length;

  // Active word index calculation
  const activeWordIndex = Math.min(totalWords - 1, Math.floor(progressInCue * totalWords));

  // Entrance spring for the subtitle pill
  const pillEntrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  const pillScale = interpolate(pillEntrance, [0, 1], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillOpacity = interpolate(pillEntrance, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 180,
        left: 48,
        right: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 980,
          padding: '24px 36px',
          borderRadius: 28,
          backgroundColor: 'rgba(5, 18, 10, 0.92)',
          border: '2.5px solid rgba(74, 222, 128, 0.55)',
          boxShadow:
            '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(34, 197, 94, 0.25)',
          backdropFilter: 'blur(16px)',
          transform: `scale(${pillScale})`,
          opacity: pillOpacity,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px 14px',
          textAlign: 'center',
        }}
      >
        {words.map((word, idx) => {
          const isCurrent = idx === activeWordIndex;
          const isPast = idx < activeWordIndex;
          const cleanWord = word.replace(/[,.!?]/g, '').toLowerCase();

          const isHighlight = highlightWords.some(
            (hw) => hw.replace(/[,.!?]/g, '').toLowerCase() === cleanWord
          );

          // Word specific appearance timing
          const wordStartRatio = idx / totalWords;
          const wordFrameOffset = startFrame + wordStartRatio * duration;
          const wordSpring = spring({
            frame: frame - wordFrameOffset,
            fps,
            config: { damping: 12, stiffness: 220 },
          });

          const wordScale = isCurrent
            ? interpolate(wordSpring, [0, 1], [1, 1.22], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : isPast
            ? 1
            : 0.92;

          let textColor = '#E2E8F0';
          if (isHighlight) {
            textColor = highlightColor;
          } else if (isCurrent) {
            textColor = '#FFFFFF';
          }

          const textShadow = isHighlight
            ? `0 0 16px ${highlightColor}80, 0 3px 6px rgba(0,0,0,0.8)`
            : isCurrent
            ? '0 0 14px rgba(255, 255, 255, 0.8), 0 3px 6px rgba(0,0,0,0.8)'
            : '0 2px 4px rgba(0,0,0,0.6)';

          return (
            <span
              key={idx}
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif",
                fontSize: 40,
                fontWeight: isHighlight || isCurrent ? 900 : 700,
                color: textColor,
                textShadow,
                letterSpacing: '-0.01em',
                transform: `scale(${wordScale}) translateY(${isCurrent ? -4 : 0}px)`,
                display: 'inline-block',
                transition: 'none',
                backgroundColor: isCurrent ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                borderRadius: 8,
                padding: '2px 6px',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
