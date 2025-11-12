import type { BaseExampleParams } from '../types';

export interface ParticleEmitterParams extends BaseExampleParams {
  // Particle appearance
  minSize: number;
  maxSize: number;

  // Emission
  emissionRate: number; // particles per frame when mouse is pressed

  // Physics
  gravity: number;
  friction: number; // velocity decay factor
  minVelocity: number;
  maxVelocity: number;
  bounceDamping: number; // energy retained on bounce (0-1)

  // Lifecycle
  lifetime: number; // frames before particle fades out

  // Performance
  maxParticles: number;
}

export const defaultParticleEmitterParams: ParticleEmitterParams = {
  // Appearance
  minSize: 5,
  maxSize: 30,

  // Emission
  emissionRate: 3,

  // Physics
  gravity: 0.2,
  friction: 0.99,
  minVelocity: 2,
  maxVelocity: 8,
  bounceDamping: 0.8,

  // Lifecycle
  lifetime: 120, // ~2 seconds at 60fps

  // Performance
  maxParticles: 500,

  // Base params
  backgroundColor: '#000000',
  isPaused: false,
};
