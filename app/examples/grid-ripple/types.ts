import type { BaseExampleParams } from '../types';

export interface GridRippleParams extends BaseExampleParams {
  // Grid
  gridColumns: number;
  gridRows: number;

  // Physics
  rippleRadius: number; // influence range in pixels
  rippleStrength: number; // push force multiplier
  springStiffness: number; // return force
  damping: number; // velocity damping

  // Visual
  lineWeight: number;
  lineColor: string;
  showPoints: boolean;
  pointSize: number;
}

export const defaultGridRippleParams: GridRippleParams = {
  // Grid
  gridColumns: 42,
  gridRows: 28,

  // Physics
  rippleRadius: 220,
  rippleStrength: 2.0,
  springStiffness: 0.08,
  damping: 0.91,

  // Visual
  lineWeight: 2,
  lineColor: '#88bcc9',
  showPoints: true,
  pointSize: 4,

  // Base params
  backgroundColor: '#000000',
  isPaused: false,
};
