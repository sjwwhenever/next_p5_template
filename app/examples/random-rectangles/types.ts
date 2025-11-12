import type { BaseExampleParams } from '../types';

// Color palettes extracted from user-provided screenshots
export const COLOR_PALETTES = [
  // Palette 1
  ['#d94c4c', '#bcd9d9', '#f5eed9', '#6b8aad', '#2d4159'],
  // Palette 2
  ['#d9bcb3', '#bf5959', '#f2f2a3', '#6b8c8c', '#2d3d40'],
  // Palette 3
  ['#4d2d40', '#737373', '#88c9c0', '#bfd9a3', '#f2f2a6'],
  // Palette 4
  ['#1a1f26', '#3d4d66', '#7a91b3', '#d9d9e6', '#d9d4b8'],
];

export interface RandomRectanglesParams extends BaseExampleParams {
  rectangleCount: number; // Number of rectangles to generate
  minSize: number; // Minimum rectangle size (width/height)
  maxSize: number; // Maximum rectangle size (width/height)
  edgeMargin: number; // Margin around canvas edges
  spacing: number; // Minimum spacing between rectangles
  regenerationInterval: number; // Time in seconds before regenerating
  transitionDuration: number; // Time in seconds for transition animation
  cornerRadius: number; // Border radius for rounded corners
  strokeWeight: number; // Stroke thickness (0 for no stroke)
  strokeColor: string; // Stroke color
}

export const defaultRandomRectanglesParams: RandomRectanglesParams = {
  rectangleCount: 50,
  minSize: 20,
  maxSize: 190,
  edgeMargin: 100,
  spacing: 0,
  regenerationInterval: 3,
  transitionDuration: 0.3,
  cornerRadius: 0,
  strokeWeight: 3,
  strokeColor: '#ffffff',
  backgroundColor: '#ffffff',
  isPaused: false,
};
