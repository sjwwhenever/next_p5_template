import type { RandomRectanglesParams } from './types';
import { COLOR_PALETTES } from './types';
import p5 from 'p5';

interface Rectangle {
  // Current animated state
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  // Target state
  targetX: number;
  targetY: number;
  targetWidth: number;
  targetHeight: number;
  targetColor: string;
}

export function createRandomRectanglesSketch(containerRef: React.RefObject<HTMLDivElement | null>) {
  return async (initialParams: RandomRectanglesParams) => {
    // Import p5 dynamically to ensure client-side only
    const p5Module = (await import('p5')).default;

    let params = { ...initialParams };
    let isPaused = false;

    // Rectangles and palette state
    let rectangles: Rectangle[] = [];
    let currentPaletteIndex = 0;
    let currentBackgroundColor = '#ffffff';
    let targetBackgroundColor = '#ffffff';
    let lastRegenerationTime = 0;
    let transitionStartTime = 0;

    const sketch = (p: p5) => {
      // Ease-in-out function (cubic)
      function easeInOut(t: number): number {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      // Linear interpolation
      function lerp(start: number, end: number, t: number): number {
        return start + (end - start) * t;
      }

      // Color interpolation (RGB)
      function lerpColor(colorA: string, colorB: string, t: number, p: p5): string {
        const a = p.color(colorA);
        const b = p.color(colorB);
        const r = lerp(p.red(a), p.red(b), t);
        const g = lerp(p.green(a), p.green(b), t);
        const bl = lerp(p.blue(a), p.blue(b), t);
        return p.color(r, g, bl).toString();
      }

      p.setup = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        const canvas = p.createCanvas(width, height);
        if (containerRef.current) {
          canvas.parent(containerRef.current);
        }

        // Generate initial rectangles
        generateRectangles(p);
        lastRegenerationTime = p.millis();
        transitionStartTime = p.millis();
      };

      p.draw = () => {
        // Calculate transition progress
        let timeSinceTransition = p.millis() - transitionStartTime;
        let rawProgress = Math.min(timeSinceTransition / (params.transitionDuration * 1000), 1);
        let progress = easeInOut(rawProgress);

        // Interpolate background color
        const bgColor = lerpColor(currentBackgroundColor, targetBackgroundColor, progress, p);

        // Handle transparent background for captures
        if ((p as any).captureWithTransparentBackground) {
          p.clear();
        } else {
          p.background(bgColor);
        }

        // Update current background color when transition completes
        if (rawProgress >= 1) {
          currentBackgroundColor = targetBackgroundColor;
        }

        // Check if it's time to regenerate
        if (!isPaused && p.millis() - lastRegenerationTime >= params.regenerationInterval * 1000) {
          // First, commit current positions to their target values
          for (const rect of rectangles) {
            rect.x = rect.targetX;
            rect.y = rect.targetY;
            rect.width = rect.targetWidth;
            rect.height = rect.targetHeight;
            rect.color = rect.targetColor;
          }
          currentBackgroundColor = targetBackgroundColor;

          // Rotate to next palette
          currentPaletteIndex = (currentPaletteIndex + 1) % COLOR_PALETTES.length;
          generateTargets(p);
          lastRegenerationTime = p.millis();
          transitionStartTime = p.millis();

          // Recalculate progress for this frame with new transitionStartTime
          timeSinceTransition = p.millis() - transitionStartTime;
          rawProgress = Math.min(timeSinceTransition / (params.transitionDuration * 1000), 1);
          progress = easeInOut(rawProgress);
        }

        // Update and draw all rectangles with interpolation
        updateAndDrawRectangles(p, progress, rawProgress);
      };

      p.windowResized = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        p.resizeCanvas(width, height);

        // Regenerate rectangles for new canvas size
        generateRectangles(p);
        transitionStartTime = p.millis();
      };

      // Method to update parameters without recreating sketch
      (p as any).updateParams = (newParams: RandomRectanglesParams) => {
        const needsRegeneration =
          params.rectangleCount !== newParams.rectangleCount ||
          params.minSize !== newParams.minSize ||
          params.maxSize !== newParams.maxSize ||
          params.edgeMargin !== newParams.edgeMargin ||
          params.spacing !== newParams.spacing;

        params = { ...newParams };
        isPaused = newParams.isPaused;

        // Regenerate rectangles if parameters changed
        if (needsRegeneration) {
          generateRectangles(p);
          transitionStartTime = p.millis();
        }
      };

      // Generate initial rectangles (both current and target states are the same)
      function generateRectangles(p: p5) {
        rectangles = [];
        const currentPalette = COLOR_PALETTES[currentPaletteIndex];

        // Pick a random background color from the current palette
        const bgColor = p.random(currentPalette) as string;
        currentBackgroundColor = bgColor;
        targetBackgroundColor = bgColor;

        // Filter palette to exclude background color for rectangles
        const rectangleColors = currentPalette.filter(color => color !== bgColor);

        const maxAttempts = 1000; // Prevent infinite loops

        // Calculate available area
        const availableWidth = p.width - params.edgeMargin * 2;
        const availableHeight = p.height - params.edgeMargin * 2;

        for (let i = 0; i < params.rectangleCount; i++) {
          let placed = false;
          let attempts = 0;

          while (!placed && attempts < maxAttempts) {
            attempts++;

            // Random size
            const width = p.random(params.minSize, params.maxSize);
            const height = p.random(params.minSize, params.maxSize);

            // Random position within margins
            const x = p.random(
              params.edgeMargin,
              params.edgeMargin + availableWidth - width
            );
            const y = p.random(
              params.edgeMargin,
              params.edgeMargin + availableHeight - height
            );

            // Random color from filtered palette (excluding background)
            const color = p.random(rectangleColors) as string;

            const newRect: Rectangle = {
              x, y, width, height, color,
              targetX: x, targetY: y, targetWidth: width, targetHeight: height, targetColor: color
            };

            // Check for overlaps with existing rectangles
            if (rectangles.every((rect) => !overlaps(newRect, rect, params.spacing))) {
              rectangles.push(newRect);
              placed = true;
            }
          }
        }
      }

      // Generate new target states for existing rectangles
      function generateTargets(p: p5) {
        const currentPalette = COLOR_PALETTES[currentPaletteIndex];

        // Set new target background color
        targetBackgroundColor = p.random(currentPalette) as string;

        // Filter palette to exclude background color for rectangles
        const rectangleColors = currentPalette.filter(color => color !== targetBackgroundColor);

        const maxAttempts = 1000;
        const availableWidth = p.width - params.edgeMargin * 2;
        const availableHeight = p.height - params.edgeMargin * 2;

        // Handle count changes
        if (rectangles.length < params.rectangleCount) {
          // Add new rectangles
          for (let i = rectangles.length; i < params.rectangleCount; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < maxAttempts) {
              attempts++;

              const width = p.random(params.minSize, params.maxSize);
              const height = p.random(params.minSize, params.maxSize);
              const x = p.random(params.edgeMargin, params.edgeMargin + availableWidth - width);
              const y = p.random(params.edgeMargin, params.edgeMargin + availableHeight - height);
              const color = p.random(rectangleColors) as string;

              const newRect: Rectangle = {
                x, y, width, height, color,
                targetX: x, targetY: y, targetWidth: width, targetHeight: height, targetColor: color
              };

              if (rectangles.every((rect) => !overlaps(newRect, rect, params.spacing))) {
                rectangles.push(newRect);
                placed = true;
              }
            }
          }
        } else if (rectangles.length > params.rectangleCount) {
          // Remove excess rectangles
          rectangles = rectangles.slice(0, params.rectangleCount);
        }

        // Update targets for all rectangles
        for (let i = 0; i < rectangles.length; i++) {
          const rect = rectangles[i];
          let placed = false;
          let attempts = 0;

          while (!placed && attempts < maxAttempts) {
            attempts++;

            const width = p.random(params.minSize, params.maxSize);
            const height = p.random(params.minSize, params.maxSize);
            const x = p.random(params.edgeMargin, params.edgeMargin + availableWidth - width);
            const y = p.random(params.edgeMargin, params.edgeMargin + availableHeight - height);
            const color = p.random(rectangleColors) as string;

            // Set new targets
            rect.targetX = x;
            rect.targetY = y;
            rect.targetWidth = width;
            rect.targetHeight = height;
            rect.targetColor = color;
            placed = true; // Accept any position since overlaps during transition are ok
          }
        }
      }

      // Check if two rectangles overlap (including spacing)
      function overlaps(rect1: Rectangle, rect2: Rectangle, spacing: number): boolean {
        return !(
          rect1.x + rect1.width + spacing < rect2.x ||
          rect1.x > rect2.x + rect2.width + spacing ||
          rect1.y + rect1.height + spacing < rect2.y ||
          rect1.y > rect2.y + rect2.height + spacing
        );
      }

      // Update rectangle positions and draw with interpolation
      function updateAndDrawRectangles(p: p5, progress: number, rawProgress: number) {
        for (const rect of rectangles) {
          // Interpolate all properties
          const currentX = lerp(rect.x, rect.targetX, progress);
          const currentY = lerp(rect.y, rect.targetY, progress);
          const currentWidth = lerp(rect.width, rect.targetWidth, progress);
          const currentHeight = lerp(rect.height, rect.targetHeight, progress);
          const currentColor = lerpColor(rect.color, rect.targetColor, progress, p);

          // Update actual state when transition completes
          if (rawProgress >= 1) {
            rect.x = rect.targetX;
            rect.y = rect.targetY;
            rect.width = rect.targetWidth;
            rect.height = rect.targetHeight;
            rect.color = rect.targetColor;
          }

          // Draw rectangle
          p.fill(currentColor);

          if (params.strokeWeight > 0) {
            p.stroke(params.strokeColor);
            p.strokeWeight(params.strokeWeight);
          } else {
            p.noStroke();
          }

          if (params.cornerRadius > 0) {
            p.rect(currentX, currentY, currentWidth, currentHeight, params.cornerRadius);
          } else {
            p.rect(currentX, currentY, currentWidth, currentHeight);
          }
        }
      }
    };

    return new p5Module(sketch);
  };
}
