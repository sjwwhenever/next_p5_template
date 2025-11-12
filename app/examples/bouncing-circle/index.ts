import type { Example } from '../types';
import { createBouncingCircleSketch } from './sketch';
import { defaultBouncingCircleParams, type BouncingCircleParams } from './types';
import BouncingCircleControls from './Controls';

export const bouncingCircleExample: Example<BouncingCircleParams> = {
  metadata: {
    id: 'bouncing-circle',
    name: 'Bouncing Circle',
    description: 'A colorful bouncing circle with animated color cycling and trail effect',
  },
  defaultParams: defaultBouncingCircleParams,
  createSketch: createBouncingCircleSketch,
  Controls: BouncingCircleControls,
};
