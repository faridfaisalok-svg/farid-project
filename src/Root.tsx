import React from 'react';
import { Composition } from 'remotion';
import { VIDEO_DURATION_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';
import { Video } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BambangBerkebun"
      component={Video}
      durationInFrames={VIDEO_DURATION_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
