'use client';

import type { Example, BaseExampleParams } from '../examples/types';
import CollapsibleSection from './CollapsibleSection';
import CircularProgress from './CircularProgress';
import ExampleSelector from './ExampleSelector';
import { Settings2, Play, Pause, Camera, Video, Download, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

interface GuiPanelProps<T extends BaseExampleParams> {
  example: Example<T>;
  params: T;
  onExampleChange: (example: Example<any>) => void;
  onParamChange: (params: T) => void;
  onCaptureImage: (transparent: boolean) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  recordingProgress: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onImportConfig: (config: T) => void;
}

export default function GuiPanel<T extends BaseExampleParams>({
  example,
  params,
  onExampleChange,
  onParamChange,
  onCaptureImage,
  onStartRecording,
  onStopRecording,
  isRecording,
  recordingProgress,
  isPaused,
  onTogglePause,
  onImportConfig,
}: GuiPanelProps<T>) {
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

  const ControlsComponent = example.Controls;

  return (
    <div className="w-80 bg-gray-800 text-white flex flex-col h-full overflow-hidden">
      {/* Scrollable Controls */}
      <div className="flex-1 overflow-y-auto">
        {/* Example Selector */}
        <div className="p-3 border-b border-gray-700">
          <ExampleSelector selectedExample={example} onExampleChange={onExampleChange} />
        </div>

        {/* Example-specific Controls */}
        <CollapsibleSection title="Settings" icon={<Settings2 size={16} />}>
          <ControlsComponent params={params} onParamsChange={onParamChange} />
        </CollapsibleSection>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="border-t border-gray-700 p-3 space-y-2 bg-gray-800">
        {/* Control Buttons Row */}
        <div className="flex gap-2">
          {/* Play/Pause */}
          <button
            onClick={onTogglePause}
            title={isPaused ? 'Play' : 'Pause'}
            className="flex-1 flex items-center justify-center p-3 bg-white hover:bg-gray-100 text-black rounded transition-colors"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>

          {/* Capture Image */}
          <button
            onClick={() => onCaptureImage(transparentCapture)}
            title="Capture Image"
            className="flex-1 flex items-center justify-center p-3 bg-gray-300 hover:bg-gray-400 text-black rounded transition-colors"
          >
            <Camera size={20} />
          </button>

          {/* Record Video */}
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            title={isRecording ? 'Stop Recording' : 'Record Video (10s)'}
            className={`flex-1 flex items-center justify-center p-3 rounded transition-colors ${
              isRecording
                ? 'bg-black hover:bg-gray-950 text-white'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            {isRecording ? (
              <CircularProgress progress={recordingProgress} size={20} strokeWidth={3} />
            ) : (
              <Video size={20} />
            )}
          </button>
        </div>

        {/* Transparent Background Option */}
        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={transparentCapture}
            onChange={(e) => setTransparentCapture(e.target.checked)}
            className="w-4 h-4"
          />
          Transparent background
        </label>

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
