import type { BouncingCircleParams } from './types';
import p5 from 'p5';

export function createBouncingCircleSketch(containerRef: React.RefObject<HTMLDivElement | null>) {
  return async (initialParams: BouncingCircleParams) => {
    // Import p5 dynamically to ensure client-side only
    const p5Module = (await import('p5')).default;

    let params = { ...initialParams };
    let isPaused = false;

    // Circle position and velocity
    let x = 0;
    let y = 0;
    let vx = 2;
    let vy = 2;

    // Track time for pause handling
    let lastTime = 0;

    // Hue for color animation
    let hue = 0;

    const sketch = (p: p5) => {
      p.setup = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        const canvas = p.createCanvas(width, height);
        if (containerRef.current) {
          canvas.parent(containerRef.current);
        }

        // Initialize position to center
        x = p.width / 2;
        y = p.height / 2;

        // Set initial velocity based on speed param
        const angle = p.random(p.TWO_PI);
        vx = Math.cos(angle) * params.speed;
        vy = Math.sin(angle) * params.speed;

        lastTime = p.millis();
      };

      p.draw = () => {
        // Handle transparent background for captures
        if ((p as any).captureWithTransparentBackground) {
          p.clear();
        } else {
          // Add semi-transparent overlay for trail effect (medium persistence)
          const overlayColor = p.color(params.backgroundColor);
          overlayColor.setAlpha(50);
          p.fill(overlayColor);
          p.rect(0, 0, p.width, p.height);
        }

        // Update position if not paused
        if (!isPaused) {
          const currentTime = p.millis();
          const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
          lastTime = currentTime;

          // Update position
          x += vx * deltaTime;
          y += vy * deltaTime;

          // Bounce off edges
          if (x - params.circleSize / 2 < 0 || x + params.circleSize / 2 > p.width) {
            vx *= -1;
            x = p.constrain(x, params.circleSize / 2, p.width - params.circleSize / 2);
          }
          if (y - params.circleSize / 2 < 0 || y + params.circleSize / 2 > p.height) {
            vy *= -1;
            y = p.constrain(y, params.circleSize / 2, p.height - params.circleSize / 2);
          }

          // Update hue for color animation
          hue = (hue + 1) % 360;
        }

        // Draw circle with animated color
        p.colorMode(p.HSB, 360, 100, 100);
        p.fill(hue, 80, 90);
        p.noStroke();
        p.circle(x, y, params.circleSize);
        p.colorMode(p.RGB, 255); // Switch back to RGB
      };

      p.windowResized = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        p.resizeCanvas(width, height);

        // Keep circle within bounds after resize
        x = p.constrain(x, params.circleSize / 2, p.width - params.circleSize / 2);
        y = p.constrain(y, params.circleSize / 2, p.height - params.circleSize / 2);
      };

      // Method to update parameters without recreating sketch
      (p as any).updateParams = (newParams: BouncingCircleParams) => {
        const oldSpeed = params.speed;
        params = { ...newParams };
        isPaused = newParams.isPaused;

        // Update velocity if speed changed
        if (oldSpeed !== params.speed && (vx !== 0 || vy !== 0)) {
          const currentAngle = Math.atan2(vy, vx);
          vx = Math.cos(currentAngle) * params.speed;
          vy = Math.sin(currentAngle) * params.speed;
        }

        // Update time when unpausing
        if (!isPaused) {
          lastTime = p.millis();
        }
      };
    };

    return new p5Module(sketch);
  };
}
