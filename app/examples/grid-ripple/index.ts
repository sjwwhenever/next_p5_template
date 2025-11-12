import type { Example } from '../types';
import { createGridRippleSketch } from './sketch';
import { defaultGridRippleParams, type GridRippleParams } from './types';
import GridRippleControls from './Controls';

export const gridRippleExample: Example<GridRippleParams> = {
  metadata: {
    id: 'grid-ripple',
    name: 'Grid Ripple',
    description: 'Interactive grid with water-like ripple effect following your cursor',
  },
  defaultParams: defaultGridRippleParams,
  createSketch: createGridRippleSketch,
  Controls: GridRippleControls,
};
