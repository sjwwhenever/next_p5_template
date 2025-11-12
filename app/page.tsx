'use client';

import { useState, useRef, useEffect } from 'react';
import P5Canvas, { P5CanvasRef } from './components/P5Canvas';
import GuiPanel from './components/GuiPanel';
import AuthorFooter from './components/AuthorFooter';
import { getDefaultExample } from './examples/registry';
import type { Example, BaseExampleParams } from './examples/types';

export default function Home() {
  // Get the default example (first registered example)
  const defaultExample = getDefaultExample()!;

  // State for selected example
  const [selectedExample, setSelectedExample] = useState<Example<any>>(defaultExample);

  // State for parameters per example (keyed by example ID)
  const [exampleParams, setExampleParams] = useState<Record<string, any>>({
    [defaultExample.metadata.id]: defaultExample.defaultParams,
  });

  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const canvasRef = useRef<P5CanvasRef>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get current params for selected example
  const currentParams = exampleParams[selectedExample.metadata.id] || selectedExample.defaultParams;

  // Handle example change
  const handleExampleChange = (newExample: Example<any>) => {
    console.log('Switching to example:', newExample.metadata.name);

    // Initialize params for new example if not already present
    if (!exampleParams[newExample.metadata.id]) {
      setExampleParams((prev) => ({
        ...prev,
        [newExample.metadata.id]: newExample.defaultParams,
      }));
    }

    setSelectedExample(newExample);
    // Unpause when switching examples
    setIsPaused(false);
  };

  // Handle parameter changes from GUI
  const handleParamChange = (newParams: any) => {
    setExampleParams((prev) => ({
      ...prev,
      [selectedExample.metadata.id]: newParams,
    }));
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
    setRecordingProgress(0);
    canvasRef.current?.startRecording(10, false, 'medium');

    const startTime = Date.now();
    const duration = 10000; // 10 seconds

    // Update progress every 100ms
    recordingIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setRecordingProgress(progress);

      if (progress >= 100) {
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current);
          recordingIntervalRef.current = null;
        }
      }
    }, 100);

    // Auto-update recording state after duration
    setTimeout(() => {
      setIsRecording(false);
      setRecordingProgress(0);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }, duration);
  };

  // Stop recording
  const handleStopRecording = () => {
    console.log('Page: Stopping recording');
    canvasRef.current?.stopRecording();
    setIsRecording(false);
    setRecordingProgress(0);

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  // Import configuration
  const handleImportConfig = (config: any) => {
    setExampleParams((prev) => ({
      ...prev,
      [selectedExample.metadata.id]: { ...config, isPaused: false },
    }));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* GUI Panel */}
      <GuiPanel
        example={selectedExample}
        params={currentParams}
        onExampleChange={handleExampleChange}
        onParamChange={handleParamChange}
        onCaptureImage={handleCaptureImage}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        isRecording={isRecording}
        recordingProgress={recordingProgress}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onImportConfig={handleImportConfig}
      />

      {/* Canvas Area with Footer */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* P5 Canvas */}
        <div className="flex-1">
          <P5Canvas
            ref={canvasRef}
            example={selectedExample}
            params={currentParams}
            isPaused={isPaused}
          />
        </div>

        {/* Author Footer */}
        <AuthorFooter />
      </div>
    </div>
  );
}
