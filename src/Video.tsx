import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { BackgroundPattern } from './components/BackgroundPattern';
import { KineticSubtitle } from './components/KineticSubtitle';
import { ProgressBar } from './components/ProgressBar';
import { SoundWaveIndicator } from './components/SoundWaveIndicator';
import { SUBTITLES, VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene3Secret } from './scenes/Scene3Secret';
import { Scene4Eggshell } from './scenes/Scene4Eggshell';
import { Scene5Banana } from './scenes/Scene5Banana';
import { Scene6HowToSteps } from './scenes/Scene6HowToSteps';
import { Scene7Spread } from './scenes/Scene7Spread';
import { Scene8Watering } from './scenes/Scene8Watering';
import { Scene9HarvestOutro } from './scenes/Scene9HarvestOutro';

export const Video: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active subtitle cue
  const activeCue =
    SUBTITLES.find((cue) => frame >= cue.startFrame && frame < cue.endFrame) || null;

  // Background theme per scene
  let currentTheme: 'green' | 'warm' | 'darkGreen' | 'fresh' = 'green';
  if (frame >= 168 && frame < 407) {
    currentTheme = 'warm';
  } else if (frame >= 407 && frame < 588) {
    currentTheme = 'fresh';
  } else if (frame >= 588 && frame < 759) {
    currentTheme = 'darkGreen';
  } else if (frame >= 759 && frame < 963) {
    currentTheme = 'warm';
  } else if (frame >= 963 && frame < 1218) {
    currentTheme = 'green';
  } else if (frame >= 1218 && frame < 1418) {
    currentTheme = 'fresh';
  } else if (frame >= 1418 && frame < 1715) {
    currentTheme = 'fresh';
  } else if (frame >= 1715) {
    currentTheme = 'warm';
  }

  return (
    <div
      style={{
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        position: 'relative',
        backgroundColor: '#031207',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Global Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Montserrat:wght@700;800;900&display=swap');
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* Synchronized Voice Audio */}
      <Audio src={staticFile('suara_bambang.mp3')} />

      {/* Animated Dynamic Background */}
      <BackgroundPattern theme={currentTheme} />

      {/* Progress Bar & Header */}
      <ProgressBar />

      {/* Top Floating Sound Indicator */}
      <div
        style={{
          position: 'absolute',
          top: 86,
          left: 48,
          zIndex: 45,
        }}
      >
        <SoundWaveIndicator />
      </div>

      {/* Scene Sequences */}
      {/* Scene 1: Intro (0 -> 168) */}
      <Sequence from={0} durationInFrames={168}>
        <Scene1Intro />
      </Sequence>

      {/* Scene 2: Problem & Reveal (168 -> 407) */}
      <Sequence from={168} durationInFrames={239}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: Two Ingredients (407 -> 588) */}
      <Sequence from={407} durationInFrames={181}>
        <Scene3Secret />
      </Sequence>

      {/* Scene 4: Eggshell / Calcium (588 -> 759) */}
      <Sequence from={588} durationInFrames={171}>
        <Scene4Eggshell />
      </Sequence>

      {/* Scene 5: Banana Peel / Potassium (759 -> 963) */}
      <Sequence from={759} durationInFrames={204}>
        <Scene5Banana />
      </Sequence>

      {/* Scene 6: How-To Steps 1 & 2 (963 -> 1218) */}
      <Sequence from={963} durationInFrames={255}>
        <Scene6HowToSteps />
      </Sequence>

      {/* Scene 7: Spread on Soil (1218 -> 1418) */}
      <Sequence from={1218} durationInFrames={200}>
        <Scene7Spread />
      </Sequence>

      {/* Scene 8: Watering & Nutrient Absorption (1418 -> 1715) */}
      <Sequence from={1418} durationInFrames={297}>
        <Scene8Watering />
      </Sequence>

      {/* Scene 9: Harvest & Outro (1715 -> 2048) */}
      <Sequence from={1715} durationInFrames={333}>
        <Scene9HarvestOutro />
      </Sequence>

      {/* Dynamic Kinetic Subtitles Overlay */}
      <KineticSubtitle cue={activeCue} />
    </div>
  );
};
