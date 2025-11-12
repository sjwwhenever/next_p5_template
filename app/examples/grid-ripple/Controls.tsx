'use client';

import type { GridRippleParams } from './types';

interface GridRippleControlsProps {
  params: GridRippleParams;
  onParamsChange: (params: GridRippleParams) => void;
}

export default function GridRippleControls({
  params,
  onParamsChange,
}: GridRippleControlsProps) {
  const handleChange = (updates: Partial<GridRippleParams>) => {
    onParamsChange({ ...params, ...updates });
  };

  return (
    <>
      {/* Grid Columns */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Grid Columns</label>
          <span className="text-xs text-gray-400">{params.gridColumns}</span>
        </div>
        <input
          type="range"
          min="10"
          max="50"
          step="1"
          value={params.gridColumns}
          onChange={(e) => handleChange({ gridColumns: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Grid Rows */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Grid Rows</label>
          <span className="text-xs text-gray-400">{params.gridRows}</span>
        </div>
        <input
          type="range"
          min="10"
          max="50"
          step="1"
          value={params.gridRows}
          onChange={(e) => handleChange({ gridRows: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Ripple Radius */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Ripple Radius</label>
          <span className="text-xs text-gray-400">{params.rippleRadius}px</span>
        </div>
        <input
          type="range"
          min="50"
          max="300"
          step="10"
          value={params.rippleRadius}
          onChange={(e) => handleChange({ rippleRadius: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Ripple Strength */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Ripple Strength</label>
          <span className="text-xs text-gray-400">{params.rippleStrength.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="5.0"
          step="0.1"
          value={params.rippleStrength}
          onChange={(e) => handleChange({ rippleStrength: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Spring Stiffness */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Spring Stiffness</label>
          <span className="text-xs text-gray-400">{params.springStiffness.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.20"
          step="0.01"
          value={params.springStiffness}
          onChange={(e) => handleChange({ springStiffness: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Damping */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Damping</label>
          <span className="text-xs text-gray-400">{params.damping.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.85"
          max="0.99"
          step="0.01"
          value={params.damping}
          onChange={(e) => handleChange({ damping: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Line Weight */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-300">Line Weight</label>
          <span className="text-xs text-gray-400">{params.lineWeight}px</span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={params.lineWeight}
          onChange={(e) => handleChange({ lineWeight: Number(e.target.value) })}
          className="w-full slider"
        />
      </div>

      {/* Line Color */}
      <div className="space-y-1">
        <label className="text-xs text-gray-300">Line Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={params.lineColor}
            onChange={(e) => handleChange({ lineColor: e.target.value })}
            className="w-12 h-8 rounded cursor-pointer"
          />
          <input
            type="text"
            value={params.lineColor}
            onChange={(e) => handleChange({ lineColor: e.target.value })}
            className="flex-1 px-2 py-1 bg-gray-700 rounded text-xs"
          />
        </div>
      </div>

      {/* Show Points */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={params.showPoints}
            onChange={(e) => handleChange({ showPoints: e.target.checked })}
            className="w-4 h-4"
          />
          Show Grid Points
        </label>
      </div>

      {/* Point Size (only if showPoints is true) */}
      {params.showPoints && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs text-gray-300">Point Size</label>
            <span className="text-xs text-gray-400">{params.pointSize}px</span>
          </div>
          <input
            type="range"
            min="2"
            max="10"
            step="1"
            value={params.pointSize}
            onChange={(e) => handleChange({ pointSize: Number(e.target.value) })}
            className="w-full slider"
          />
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
