import type p5 from 'p5';
import type { ReactNode } from 'react';

/**
 * Base parameters that all examples should support
 */
export interface BaseExampleParams {
  backgroundColor: string;
  isPaused: boolean;
}

/**
 * Example metadata and configuration
 */
export interface ExampleMetadata {
  id: string;
  name: string;
  description: string;
}

/**
 * Factory function that creates a p5 sketch instance
 */
export type SketchFactory<T extends BaseExampleParams> = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => (initialParams: T) => Promise<p5>;

/**
 * Controls component for an example
 */
export type ControlsComponent<T extends BaseExampleParams> = React.FC<{
  params: T;
  onParamsChange: (params: T) => void;
}>;

/**
 * Complete example definition
 */
export interface Example<T extends BaseExampleParams> {
  metadata: ExampleMetadata;
  defaultParams: T;
  createSketch: SketchFactory<T>;
  Controls: ControlsComponent<T>;
}

/**
 * Example registry type
 */
export type ExampleRegistry = Record<string, Example<any>>;
