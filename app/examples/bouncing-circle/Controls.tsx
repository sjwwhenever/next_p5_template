'use client';

import type { BouncingCircleParams } from './types';

interface BouncingCircleControlsProps {
  params: BouncingCircleParams;
  onParamsChange: (params: BouncingCircleParams) => void;
}

export default function BouncingCircleControls({
  params,
  onParamsChange,
}: BouncingCircleControlsProps) {
  const handleChange = (updates: Partial<BouncingCircleParams>) => {
    onParamsChange({ ...params, ...updates });
  };

  return (
    <>
      {/* Circle Size */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Circle Size</label>
          <span className="text-xs text-gray-400">{params.circleSize}px</span>
        </div>
        <input
          type="range"
          min="10"
          max="300"
          value={params.circleSize}
          onChange={(e) => handleChange({ circleSize: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Speed */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Speed</label>
          <span className="text-xs text-gray-400">{params.speed.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.1"
          value={params.speed}
          onChange={(e) => handleChange({ speed: Number(e.target.value) })}
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
