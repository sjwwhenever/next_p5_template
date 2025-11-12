import type { ParticleEmitterParams } from './types';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: p5.Color;
  age: number;
  lifetime: number;
  alpha: number;
}

export function createParticleEmitterSketch(containerRef: React.RefObject<HTMLDivElement | null>) {
  return async (initialParams: ParticleEmitterParams) => {
    // Import p5 dynamically to ensure client-side only
    const p5Module = (await import('p5')).default;

    let params = { ...initialParams };
    let isPaused = false;

    // Particle pool for performance
    const particles: Particle[] = [];

    // Custom color palette
    const colorPalette = [
      '#3a5a6a',  // Dark teal
      '#5b8fa3',  // Medium teal
      '#88bcc9',  // Light teal
      '#e8e3da',  // Cream/beige
      '#e8a957'   // Orange/gold
    ];

    const sketch = (p: p5) => {
      p.setup = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        const canvas = p.createCanvas(width, height);
        if (containerRef.current) {
          canvas.parent(containerRef.current);
        }

        // Set color mode for vibrant colors
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };

      p.draw = () => {
        // Handle transparent background for captures
        if ((p as any).captureWithTransparentBackground) {
          p.clear();
        } else {
          // Solid background (no trail effect)
          p.background(params.backgroundColor);
        }

        if (!isPaused) {
          // Emit particles continuously from center
          if (particles.length < params.maxParticles) {
            emitParticles(p);
          }

          // Update and draw particles
          updateParticles(p);
        } else {
          // Just draw particles when paused
          drawParticles(p);
        }
      };

      p.windowResized = () => {
        // Use container dimensions instead of window dimensions
        const width = containerRef.current?.clientWidth || p.windowWidth;
        const height = containerRef.current?.clientHeight || p.windowHeight;
        p.resizeCanvas(width, height);

        // Constrain particles to new bounds (they'll bounce back in)
        for (const part of particles) {
          const halfSize = part.size / 2;
          part.x = p.constrain(part.x, halfSize, p.width - halfSize);
          part.y = p.constrain(part.y, halfSize, p.height - halfSize);
        }
      };

      // Method to update parameters without recreating sketch
      (p as any).updateParams = (newParams: ParticleEmitterParams) => {
        params = { ...newParams };
        isPaused = newParams.isPaused;
      };

      // Emit new particles from mouse position (or center if mouse is outside canvas)
      function emitParticles(p: p5) {
        // Determine emission position
        let emitX, emitY;

        // Check if mouse is within canvas bounds
        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
          emitX = p.mouseX;
          emitY = p.mouseY;
        } else {
          // Fallback to center if mouse is outside
          emitX = p.width / 2;
          emitY = p.height / 2;
        }

        for (let i = 0; i < params.emissionRate; i++) {
          if (particles.length >= params.maxParticles) break;

          // Random angle for emission (full 360 degrees)
          const angle = p.random(p.TWO_PI);
          const speed = p.random(params.minVelocity, params.maxVelocity);

          const particle: Particle = {
            x: emitX,
            y: emitY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: p.random(params.minSize, params.maxSize),
            color: getParticleColor(p),
            age: 0,
            lifetime: params.lifetime,
            alpha: 100,
          };

          particles.push(particle);
        }
      }

      // Get particle color from custom palette
      function getParticleColor(p: p5): p5.Color {
        // Pick a random color from the palette
        const hexColor = p.random(colorPalette);
        // Convert hex to p5 color (will work with HSB mode)
        return p.color(hexColor);
      }

      // Resolve particle-to-particle collisions
      function resolveCollisions(p: p5) {
        // Check all particle pairs for collisions
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            // Calculate distance between particles
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Check if particles are colliding
            const minDist = (p1.size + p2.size) / 2;

            if (distance < minDist && distance > 0) {
              // Collision detected - resolve it

              // Normalize collision vector
              const nx = dx / distance;
              const ny = dy / distance;

              // Separate particles to prevent overlap
              const overlap = minDist - distance;
              const separationX = (overlap / 2) * nx;
              const separationY = (overlap / 2) * ny;

              p1.x -= separationX;
              p1.y -= separationY;
              p2.x += separationX;
              p2.y += separationY;

              // Calculate relative velocity
              const dvx = p2.vx - p1.vx;
              const dvy = p2.vy - p1.vy;

              // Calculate relative velocity in collision normal direction
              const dotProduct = dvx * nx + dvy * ny;

              // Only resolve if particles are moving toward each other
              if (dotProduct < 0) {
                // Apply collision response (elastic collision with damping)
                const impulse = dotProduct * params.bounceDamping;

                p1.vx += impulse * nx;
                p1.vy += impulse * ny;
                p2.vx -= impulse * nx;
                p2.vy -= impulse * ny;
              }
            }
          }
        }
      }

      // Update particle physics and lifecycle
      function updateParticles(p: p5) {
        // Update in reverse to safely remove dead particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const part = particles[i];

          // Apply physics
          part.vy += params.gravity;
          part.vx *= params.friction;
          part.vy *= params.friction;

          // Update position
          part.x += part.vx;
          part.y += part.vy;

          // Bounce off edges
          const halfSize = part.size / 2;

          // Check left and right bounds
          if (part.x - halfSize <= 0) {
            part.x = halfSize;
            part.vx *= -params.bounceDamping;
          } else if (part.x + halfSize >= p.width) {
            part.x = p.width - halfSize;
            part.vx *= -params.bounceDamping;
          }

          // Check top and bottom bounds
          if (part.y - halfSize <= 0) {
            part.y = halfSize;
            part.vy *= -params.bounceDamping;
          } else if (part.y + halfSize >= p.height) {
            part.y = p.height - halfSize;
            part.vy *= -params.bounceDamping;
          }

          // Update age and alpha (fade out)
          part.age++;
          const lifeRatio = part.age / part.lifetime;

          // Fade out in the last 30% of lifetime
          if (lifeRatio > 0.7) {
            part.alpha = p.map(lifeRatio, 0.7, 1, 100, 0);
          }

          // Remove particles that have exceeded their lifetime
          if (part.age >= part.lifetime) {
            particles.splice(i, 1);
            continue;
          }
        }

        // Resolve particle-to-particle collisions
        resolveCollisions(p);

        // Draw all particles
        for (const part of particles) {
          const col = part.color;
          col.setAlpha(part.alpha);
          p.fill(col);
          p.noStroke();
          p.circle(part.x, part.y, part.size);
        }
      }

      // Draw particles without updating (for pause mode)
      function drawParticles(p: p5) {
        for (const part of particles) {
          const col = part.color;
          col.setAlpha(part.alpha);
          p.fill(col);
          p.noStroke();
          p.circle(part.x, part.y, part.size);
        }
      }

      // Expose particle count for debugging/UI
      (p as any).getParticleCount = () => particles.length;
    };

    return new p5Module(sketch);
  };
}
