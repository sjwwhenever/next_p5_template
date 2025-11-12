import type { Example } from '../types';
import { createParticleEmitterSketch } from './sketch';
import { defaultParticleEmitterParams, type ParticleEmitterParams } from './types';
import ParticleEmitterControls from './Controls';

export const particleEmitterExample: Example<ParticleEmitterParams> = {
  metadata: {
    id: 'particle-emitter',
    name: 'Particle Emitter',
    description: 'Move your mouse to emit particles continuously with bouncing physics and gravity',
  },
  defaultParams: defaultParticleEmitterParams,
  createSketch: createParticleEmitterSketch,
  Controls: ParticleEmitterControls,
};
