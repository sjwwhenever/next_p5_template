import type { Example } from '../types';
import { createRandomRectanglesSketch } from './sketch';
import { defaultRandomRectanglesParams, type RandomRectanglesParams } from './types';
import RandomRectanglesControls from './Controls';

export const randomRectanglesExample: Example<RandomRectanglesParams> = {
  metadata: {
    id: 'random-rectangles',
    name: 'Random Rectangles',
    description: 'Randomly generated rectangles with rotating color palettes every 3 seconds',
  },
  defaultParams: defaultRandomRectanglesParams,
  createSketch: createRandomRectanglesSketch,
  Controls: RandomRectanglesControls,
};
