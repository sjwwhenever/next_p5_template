import type { Example, ExampleRegistry, BaseExampleParams } from './types';
import { bouncingCircleExample } from './bouncing-circle';
import { particleEmitterExample } from './particle-emitter';

/**
 * Registry of all available examples
 */
const registry: ExampleRegistry = {};

// Register all examples
registerExample(bouncingCircleExample);
registerExample(particleEmitterExample);

/**
 * Register an example in the registry
 */
export function registerExample<T extends BaseExampleParams>(
  example: Example<T>
): void {
  registry[example.metadata.id] = example;
}

/**
 * Get an example by ID
 */
export function getExample<T extends BaseExampleParams>(
  id: string
): Example<T> | undefined {
  return registry[id] as Example<T> | undefined;
}

/**
 * Get all examples
 */
export function getAllExamples(): Example<any>[] {
  return Object.values(registry);
}

/**
 * Get all example IDs
 */
export function getExampleIds(): string[] {
  return Object.keys(registry);
}

/**
 * Check if an example exists
 */
export function hasExample(id: string): boolean {
  return id in registry;
}

/**
 * Get the default example (first registered)
 */
export function getDefaultExample(): Example<any> | undefined {
  const ids = getExampleIds();
  return ids.length > 0 ? registry[ids[0]] : undefined;
}

export { registry };
