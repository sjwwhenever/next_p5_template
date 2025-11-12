import type { BaseExampleParams } from '../types';

export interface BouncingCircleParams extends BaseExampleParams {
  circleSize: number;
  speed: number;
  circleColor: string; // Currently unused - sketch uses HSB cycling
}

export const defaultBouncingCircleParams: BouncingCircleParams = {
  circleSize: 100,
  speed: 4.0,
  circleColor: '#3b82f6',
  backgroundColor: '#000000',
  isPaused: false,
};
