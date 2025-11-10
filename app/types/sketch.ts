export interface SketchProps {
  // Circle properties
  circleSize: number;
  speed: number;
  circleColor: string;
  backgroundColor: string;

  // Playback control
  isPaused: boolean;
}

export const defaultSketchParams: SketchProps = {
  circleSize: 100,
  speed: 4.0,
  circleColor: '#3b82f6', // blue-500
  backgroundColor: '#000000', // black
  isPaused: false,
};
