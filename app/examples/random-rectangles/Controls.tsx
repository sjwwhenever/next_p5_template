'use client';

import type { RandomRectanglesParams } from './types';

interface RandomRectanglesControlsProps {
  params: RandomRectanglesParams;
  onParamsChange: (params: RandomRectanglesParams) => void;
}

export default function RandomRectanglesControls({
  params,
  onParamsChange,
}: RandomRectanglesControlsProps) {
  const handleChange = (updates: Partial<RandomRectanglesParams>) => {
    onParamsChange({ ...params, ...updates });
  };

  return (
    <>
      {/* Rectangle Count */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Rectangle Count</label>
          <span className="text-xs text-gray-400">{params.rectangleCount}</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="1"
          value={params.rectangleCount}
          onChange={(e) => handleChange({ rectangleCount: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Min Size */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Min Size</label>
          <span className="text-xs text-gray-400">{params.minSize}px</span>
        </div>
        <input
          type="range"
          min="10"
          max="150"
          step="5"
          value={params.minSize}
          onChange={(e) => handleChange({ minSize: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Max Size */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Max Size</label>
          <span className="text-xs text-gray-400">{params.maxSize}px</span>
        </div>
        <input
          type="range"
          min="50"
          max="400"
          step="10"
          value={params.maxSize}
          onChange={(e) => handleChange({ maxSize: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Edge Margin */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Edge Margin</label>
          <span className="text-xs text-gray-400">{params.edgeMargin}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="5"
          value={params.edgeMargin}
          onChange={(e) => handleChange({ edgeMargin: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Spacing */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Spacing</label>
          <span className="text-xs text-gray-400">{params.spacing}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={params.spacing}
          onChange={(e) => handleChange({ spacing: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Regeneration Interval */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Regeneration Interval</label>
          <span className="text-xs text-gray-400">{params.regenerationInterval}s</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="15"
          step="0.5"
          value={params.regenerationInterval}
          onChange={(e) => handleChange({ regenerationInterval: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Transition Duration */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Transition Duration</label>
          <span className="text-xs text-gray-400">{params.transitionDuration}s</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={params.transitionDuration}
          onChange={(e) => handleChange({ transitionDuration: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Corner Radius */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Corner Radius</label>
          <span className="text-xs text-gray-400">{params.cornerRadius}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={params.cornerRadius}
          onChange={(e) => handleChange({ cornerRadius: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Stroke Weight */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Stroke Weight</label>
          <span className="text-xs text-gray-400">{params.strokeWeight}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={params.strokeWeight}
          onChange={(e) => handleChange({ strokeWeight: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Stroke Color (only if strokeWeight > 0) */}
      {params.strokeWeight > 0 && (
        <div className="space-y-1">
          <label className="text-xs text-gray-300">Stroke Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={params.strokeColor}
              onChange={(e) => handleChange({ strokeColor: e.target.value })}
              className="w-12 h-8 rounded cursor-pointer"
            />
            <input
              type="text"
              value={params.strokeColor}
              onChange={(e) => handleChange({ strokeColor: e.target.value })}
              className="flex-1 px-2 py-1 bg-gray-700 rounded text-xs"
            />
          </div>
        </div>
      )}

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
