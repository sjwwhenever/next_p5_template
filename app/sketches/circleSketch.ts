import type { SketchProps } from '../types/sketch';
import p5 from 'p5';

export function createCircleSketch(containerRef: React.RefObject<HTMLDivElement | null>) {
  return async (initialParams: SketchProps) => {
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

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
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
          p.background(params.backgroundColor);
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
        }

        // Draw circle
        p.fill(params.circleColor);
        p.noStroke();
        p.circle(x, y, params.circleSize);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);

        // Keep circle within bounds after resize
        x = p.constrain(x, params.circleSize / 2, p.width - params.circleSize / 2);
        y = p.constrain(y, params.circleSize / 2, p.height - params.circleSize / 2);
      };

      // Method to update parameters without recreating sketch
      (p as any).updateParams = (newParams: SketchProps) => {
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
