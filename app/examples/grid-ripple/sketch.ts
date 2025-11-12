import type { GridRippleParams } from './types';
import p5 from 'p5';

interface GridPoint {
  x: number; // Current X position
  y: number; // Current Y position
  homeX: number; // Rest X position
  homeY: number; // Rest Y position
  vx: number; // X velocity
  vy: number; // Y velocity
}

export function createGridRippleSketch(containerRef: React.RefObject<HTMLDivElement | null>) {
  return async (initialParams: GridRippleParams) => {
    // Import p5 dynamically to ensure client-side only
    const p5Module = (await import('p5')).default;

    let params = { ...initialParams };
    let isPaused = false;

    // Grid points
    let grid: GridPoint[][] = [];
    let gridSpacingX = 0;
    let gridSpacingY = 0;

    const sketch = (p: p5) => {
      p.setup = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        const canvas = p.createCanvas(width, height);
        if (containerRef.current) {
          canvas.parent(containerRef.current);
        }

        // Set color mode to HSL for dynamic lightness
        p.colorMode(p.HSL, 360, 100, 100, 100);

        // Initialize grid
        initializeGrid(p);
      };

      p.draw = () => {
        // Handle transparent background for captures
        if ((p as any).captureWithTransparentBackground) {
          p.clear();
        } else {
          p.background(params.backgroundColor);
        }

        if (!isPaused) {
          // Apply mouse influence and update physics
          applyMouseInfluence(p);
          updatePhysics(p);
        }

        // Draw the grid
        drawGrid(p);
      };

      p.windowResized = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        p.resizeCanvas(width, height);

        // Reinitialize grid with new dimensions
        initializeGrid(p);
      };

      // Method to update parameters without recreating sketch
      (p as any).updateParams = (newParams: GridRippleParams) => {
        const needsGridRebuild =
          params.gridColumns !== newParams.gridColumns ||
          params.gridRows !== newParams.gridRows;

        params = { ...newParams };
        isPaused = newParams.isPaused;

        // Rebuild grid if dimensions changed
        if (needsGridRebuild) {
          initializeGrid(p);
        }
      };

      // Initialize the grid points
      function initializeGrid(p: p5) {
        grid = [];

        // Calculate spacing
        gridSpacingX = p.width / (params.gridColumns - 1);
        gridSpacingY = p.height / (params.gridRows - 1);

        // Create grid points
        for (let row = 0; row < params.gridRows; row++) {
          grid[row] = [];
          for (let col = 0; col < params.gridColumns; col++) {
            const homeX = col * gridSpacingX;
            const homeY = row * gridSpacingY;

            grid[row][col] = {
              x: homeX,
              y: homeY,
              homeX,
              homeY,
              vx: 0,
              vy: 0,
            };
          }
        }
      }

      // Apply mouse influence to grid points
      function applyMouseInfluence(p: p5) {
        // Only apply if mouse is within canvas
        if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) {
          return;
        }

        const radiusSquared = params.rippleRadius * params.rippleRadius;

        for (let row = 0; row < params.gridRows; row++) {
          for (let col = 0; col < params.gridColumns; col++) {
            const point = grid[row][col];

            // Calculate distance from mouse to point
            const dx = point.x - p.mouseX;
            const dy = point.y - p.mouseY;
            const distSquared = dx * dx + dy * dy;

            // Only affect points within ripple radius
            if (distSquared < radiusSquared && distSquared > 0) {
              const dist = Math.sqrt(distSquared);

              // Calculate force (inverse square falloff)
              const force = (params.rippleStrength * (1 - dist / params.rippleRadius)) / dist;

              // Apply force away from mouse
              point.vx += dx * force;
              point.vy += dy * force;
            }
          }
        }
      }

      // Update physics for all grid points
      function updatePhysics(p: p5) {
        for (let row = 0; row < params.gridRows; row++) {
          for (let col = 0; col < params.gridColumns; col++) {
            const point = grid[row][col];

            // Apply spring force toward home position
            const dx = point.homeX - point.x;
            const dy = point.homeY - point.y;

            point.vx += dx * params.springStiffness;
            point.vy += dy * params.springStiffness;

            // Apply damping
            point.vx *= params.damping;
            point.vy *= params.damping;

            // Update position
            point.x += point.vx;
            point.y += point.vy;
          }
        }
      }

      // Draw the grid with dynamic color based on velocity
      function drawGrid(p: p5) {
        // Get base color HSL values
        const baseColor = p.color(params.lineColor);
        const baseHue = p.hue(baseColor);
        const baseSat = p.saturation(baseColor);

        p.strokeWeight(params.lineWeight);
        p.noFill();

        // Draw horizontal lines
        for (let row = 0; row < params.gridRows; row++) {
          for (let col = 0; col < params.gridColumns - 1; col++) {
            const point1 = grid[row][col];
            const point2 = grid[row][col + 1];

            // Calculate average velocity of the two endpoints
            const vel1 = Math.sqrt(point1.vx * point1.vx + point1.vy * point1.vy);
            const vel2 = Math.sqrt(point2.vx * point2.vx + point2.vy * point2.vy);
            const avgVel = (vel1 + vel2) / 2;

            // Map velocity to lightness (0-6 velocity range -> 15-95 lightness)
            const normalizedVel = Math.min(avgVel / 6, 1);
            const lightness = 15 + normalizedVel * 80;

            // Set dynamic color
            p.stroke(baseHue, baseSat, lightness);

            // Draw line segment
            p.line(point1.x, point1.y, point2.x, point2.y);
          }
        }

        // Draw vertical lines
        for (let col = 0; col < params.gridColumns; col++) {
          for (let row = 0; row < params.gridRows - 1; row++) {
            const point1 = grid[row][col];
            const point2 = grid[row + 1][col];

            // Calculate average velocity of the two endpoints
            const vel1 = Math.sqrt(point1.vx * point1.vx + point1.vy * point1.vy);
            const vel2 = Math.sqrt(point2.vx * point2.vx + point2.vy * point2.vy);
            const avgVel = (vel1 + vel2) / 2;

            // Map velocity to lightness (0-6 velocity range -> 15-95 lightness)
            const normalizedVel = Math.min(avgVel / 6, 1);
            const lightness = 15 + normalizedVel * 80;

            // Set dynamic color
            p.stroke(baseHue, baseSat, lightness);

            // Draw line segment
            p.line(point1.x, point1.y, point2.x, point2.y);
          }
        }

        // Optionally draw points with velocity-based color
        if (params.showPoints) {
          p.noStroke();

          for (let row = 0; row < params.gridRows; row++) {
            for (let col = 0; col < params.gridColumns; col++) {
              const point = grid[row][col];

              // Calculate velocity magnitude
              const vel = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
              const normalizedVel = Math.min(vel / 6, 1);
              const lightness = 15 + normalizedVel * 80;

              // Dynamic size (grows with velocity)
              const dynamicSize = params.pointSize + normalizedVel * (params.pointSize * 3);

              // Set dynamic color
              p.fill(baseHue, baseSat, lightness);

              p.circle(point.x, point.y, dynamicSize);
            }
          }
        }
      }
    };

    return new p5Module(sketch);
  };
}
