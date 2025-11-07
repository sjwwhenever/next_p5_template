'use client';

import { SketchProps } from '../types/sketch';
import CollapsibleSection from './CollapsibleSection';
import { Settings2, Play, Pause, Camera, Video, Download, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

interface GuiPanelProps {
  params: SketchProps;
  onParamChange: (params: Partial<SketchProps>) => void;
  onCaptureImage: (transparent: boolean) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  onImportConfig: (config: SketchProps) => void;
}

export default function GuiPanel({
  params,
  onParamChange,
  onCaptureImage,
  onStartRecording,
  onStopRecording,
  isRecording,
  isPaused,
  onTogglePause,
  onImportConfig,
}: GuiPanelProps) {
  const [transparentCapture, setTransparentCapture] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportConfig = () => {
    const config = {
      ...params,
      isPaused: false, // Don't export pause state
    };
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sketch-config-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string);
          onImportConfig(config);
        } catch (error) {
          console.error('Error parsing config file:', error);
          alert('Invalid configuration file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-80 bg-gray-800 text-white flex flex-col h-full overflow-hidden">
      {/* Scrollable Controls */}
      <div className="flex-1 overflow-y-auto">
        <CollapsibleSection title="Circle Settings" icon={<Settings2 size={16} />}>
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
              onChange={(e) => onParamChange({ circleSize: Number(e.target.value) })}
              className="w-full"
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
              onChange={(e) => onParamChange({ speed: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Circle Color */}
          <div className="space-y-1">
            <label className="text-xs text-gray-300">Circle Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={params.circleColor}
                onChange={(e) => onParamChange({ circleColor: e.target.value })}
                className="w-12 h-8 rounded cursor-pointer"
              />
              <input
                type="text"
                value={params.circleColor}
                onChange={(e) => onParamChange({ circleColor: e.target.value })}
                className="flex-1 px-2 py-1 bg-gray-700 rounded text-xs"
              />
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-1">
            <label className="text-xs text-gray-300">Background Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={params.backgroundColor}
                onChange={(e) => onParamChange({ backgroundColor: e.target.value })}
                className="w-12 h-8 rounded cursor-pointer"
              />
              <input
                type="text"
                value={params.backgroundColor}
                onChange={(e) => onParamChange({ backgroundColor: e.target.value })}
                className="flex-1 px-2 py-1 bg-gray-700 rounded text-xs"
              />
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="border-t border-gray-700 p-3 space-y-2 bg-gray-800">
        {/* Play/Pause */}
        <button
          onClick={onTogglePause}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
          {isPaused ? 'Play' : 'Pause'}
        </button>

        {/* Capture Image */}
        <div className="space-y-1">
          <button
            onClick={() => onCaptureImage(transparentCapture)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
          >
            <Camera size={16} />
            Capture Image
          </button>
          <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={transparentCapture}
              onChange={(e) => setTransparentCapture(e.target.checked)}
              className="w-4 h-4"
            />
            Transparent background
          </label>
        </div>

        {/* Record Video */}
        <button
          onClick={isRecording ? onStopRecording : onStartRecording}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded transition-colors ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          <Video size={16} />
          {isRecording ? 'Stop Recording' : 'Record Video (10s)'}
        </button>

        {/* Export/Import Config */}
        <div className="flex gap-2">
          <button
            onClick={handleExportConfig}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm"
          >
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm"
          >
            <Upload size={14} />
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportConfig}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
