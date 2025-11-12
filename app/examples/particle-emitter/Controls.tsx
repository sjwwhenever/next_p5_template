'use client';

import type { ParticleEmitterParams } from './types';

interface ParticleEmitterControlsProps {
  params: ParticleEmitterParams;
  onParamsChange: (params: ParticleEmitterParams) => void;
}

export default function ParticleEmitterControls({
  params,
  onParamsChange,
}: ParticleEmitterControlsProps) {
  const handleChange = (updates: Partial<ParticleEmitterParams>) => {
    onParamsChange({ ...params, ...updates });
  };

  return (
    <>
      {/* Emission Rate */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Emission Rate</label>
          <span className="text-xs text-gray-400">{params.emissionRate} p/f</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={params.emissionRate}
          onChange={(e) => handleChange({ emissionRate: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Particle Size Range */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Size Range</label>
          <span className="text-xs text-gray-400">
            {params.minSize}-{params.maxSize}px
          </span>
        </div>
        <div className="space-y-1">
          <input
            type="range"
            min="3"
            max="20"
            step="1"
            value={params.minSize}
            onChange={(e) =>
              handleChange({
                minSize: Math.min(Number(e.target.value), params.maxSize - 5),
              })
            }
            className="w-full slider"
          />
          <input
            type="range"
            min="15"
            max="60"
            step="1"
            value={params.maxSize}
            onChange={(e) =>
              handleChange({
                maxSize: Math.max(Number(e.target.value), params.minSize + 5),
              })
            }
            className="w-full slider"
          />
        </div>
      </div>

      {/* Velocity Range */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Velocity</label>
          <span className="text-xs text-gray-400">
            {params.minVelocity.toFixed(1)}-{params.maxVelocity.toFixed(1)}
          </span>
        </div>
        <div className="space-y-1">
          <input
            type="range"
            min="0.5"
            max="6"
            step="0.5"
            value={params.minVelocity}
            onChange={(e) =>
              handleChange({
                minVelocity: Math.min(Number(e.target.value), params.maxVelocity - 1),
              })
            }
            className="w-full slider"
          />
          <input
            type="range"
            min="2"
            max="15"
            step="0.5"
            value={params.maxVelocity}
            onChange={(e) =>
              handleChange({
                maxVelocity: Math.max(Number(e.target.value), params.minVelocity + 1),
              })
            }
            className="w-full slider"
          />
        </div>
      </div>

      {/* Gravity */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Gravity</label>
          <span className="text-xs text-gray-400">{params.gravity.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={params.gravity}
          onChange={(e) => handleChange({ gravity: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Friction */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Friction</label>
          <span className="text-xs text-gray-400">{params.friction.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.90"
          max="1.00"
          step="0.01"
          value={params.friction}
          onChange={(e) => handleChange({ friction: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Bounce Damping */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Bounce Energy</label>
          <span className="text-xs text-gray-400">{(params.bounceDamping * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min="0.3"
          max="1.0"
          step="0.05"
          value={params.bounceDamping}
          onChange={(e) => handleChange({ bounceDamping: Number(e.target.value) })}
          className="w-full slider"
        />
        <p className="text-xs text-gray-400 italic">Particles bounce off canvas edges</p>
      </div>

      {/* Lifetime */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Particle Lifetime</label>
          <span className="text-xs text-gray-400">{(params.lifetime / 60).toFixed(1)}s</span>
        </div>
        <input
          type="range"
          min="30"
          max="300"
          step="10"
          value={params.lifetime}
          onChange={(e) => handleChange({ lifetime: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Max Particles */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Max Particles</label>
          <span className="text-xs text-gray-400">{params.maxParticles}</span>
        </div>
        <input
          type="range"
          min="100"
          max="500"
          step="50"
          value={params.maxParticles}
          onChange={(e) => handleChange({ maxParticles: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Background Color */}
      <div className="space-y-1">
        <label className="text-xs text-gray-300">Background Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={params.backgroundColor}
            onChange={(e) => handleChange({ backgroundColor: e.target.value })}
            className="w-12 h-8 rounded cursor-pointer"
          />
          <input
            type="text"
            value={params.backgroundColor}
            onChange={(e) => handleChange({ backgroundColor: e.target.value })}
            className="flex-1 px-2 py-1 bg-gray-700 rounded text-xs"
          />
        </div>
      </div>
    </>
  );
}
