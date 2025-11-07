'use client';

import { useState, useRef, useEffect } from 'react';
import P5Canvas, { P5CanvasRef } from './components/P5Canvas';
import GuiPanel from './components/GuiPanel';
import { defaultSketchParams, SketchProps } from './types/sketch';

export default function Home() {
  const [params, setParams] = useState<SketchProps>(defaultSketchParams);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const canvasRef = useRef<P5CanvasRef>(null);

  // Handle parameter changes from GUI
  const handleParamChange = (newParams: Partial<SketchProps>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  // Toggle pause/play
  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Keyboard shortcut for pause (spacebar)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only toggle if not typing in an input
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handleTogglePause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Capture image
  const handleCaptureImage = (transparent: boolean) => {
    console.log('Page: Triggering image capture');
    canvasRef.current?.captureImage(transparent, 'medium');
  };

  // Start recording
  const handleStartRecording = () => {
    console.log('Page: Starting recording');
    setIsRecording(true);
    canvasRef.current?.startRecording(10, false, 'medium');

    // Auto-update recording state after duration
    setTimeout(() => {
      setIsRecording(false);
    }, 10000);
  };

  // Stop recording
  const handleStopRecording = () => {
    console.log('Page: Stopping recording');
    canvasRef.current?.stopRecording();
    setIsRecording(false);
  };

  // Import configuration
  const handleImportConfig = (config: SketchProps) => {
    setParams({ ...config, isPaused: false });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* GUI Panel */}
      <GuiPanel
        params={params}
        onParamChange={handleParamChange}
        onCaptureImage={handleCaptureImage}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        isRecording={isRecording}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onImportConfig={handleImportConfig}
      />

      {/* P5 Canvas */}
      <P5Canvas ref={canvasRef} params={params} isPaused={isPaused} />
    </div>
  );
}
