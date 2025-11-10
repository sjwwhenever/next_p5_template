"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { SketchProps } from '../types/sketch';
import { createTemplateSketch } from '../sketches/TemplateSketch';

interface P5CanvasProps {
  params: SketchProps;
  isPaused: boolean;
}

export interface P5CanvasRef {
  captureImage: (transparent?: boolean, quality?: string) => void;
  startRecording: (duration: number, transparent?: boolean, quality?: string) => void;
  stopRecording: () => void;
  isRecording: boolean;
}

const P5Canvas = forwardRef<P5CanvasRef, P5CanvasProps>(({ params, isPaused }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const isRecordingRef = useRef(false);

  // Expose capture functions to parent component
  useImperativeHandle(ref, () => ({
    captureImage: (transparent = false, quality = 'medium') => {
      if (p5InstanceRef.current) {
        console.log('P5Canvas: Capturing image', transparent ? '(transparent)' : '(normal)');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `sketch-${timestamp}${transparent ? '-transparent' : ''}-${quality}.png`;

        if (transparent) {
          // Temporarily set transparent background for capture
          const sketch = p5InstanceRef.current;
          sketch.captureWithTransparentBackground = true;

          // Force immediate redraw and capture
          sketch.redraw();

          // Use requestAnimationFrame to ensure redraw completes
          requestAnimationFrame(() => {
            sketch.save(filename);
            sketch.captureWithTransparentBackground = false;
            // Force another redraw to restore normal appearance
            sketch.redraw();
          });
        } else {
          p5InstanceRef.current.save(filename);
        }
      }
    },

    startRecording: (duration: number, transparent = false, quality = 'medium') => {
      if (!p5InstanceRef.current || isRecordingRef.current) return;

      try {
        console.log('P5Canvas: Starting video recording for', duration, 'seconds', transparent ? '(transparent)' : '(normal)', `(${quality} quality)`);
        const canvas = p5InstanceRef.current.canvas;

        // Set transparent background flag for recording
        if (transparent) {
          p5InstanceRef.current.captureWithTransparentBackground = true;
        }

        const stream = canvas.captureStream(60); // 60 FPS

        recordingChunksRef.current = [];

        // Quality to bitrate mapping (in bits per second)
        const qualityBitrates = {
          low: 20000000,   // 20 Mbps
          medium: 40000000, // 40 Mbps
          high: 60000000,  // 60 Mbps
          ultra: 100000000 // 100 Mbps
        };

        const bitrate = qualityBitrates[quality as keyof typeof qualityBitrates] || qualityBitrates.medium;

        // Try different mimeTypes for better browser compatibility
        let mimeType = 'video/webm; codecs=vp9';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'video/mp4';
          }
        }

        const options = {
          mimeType,
          videoBitsPerSecond: bitrate,
          bitsPerSecond: bitrate,
          framerate: 60
        };

        mediaRecorderRef.current = new MediaRecorder(stream, options);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordingChunksRef.current.push(event.data);
        }
      };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordingChunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(blob);
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const extension = mimeType.includes('webm') ? 'webm' : 'mp4';
          const filename = `sketch-${timestamp}${transparent ? '-transparent' : ''}-${quality}.${extension}`;

          const a = document.createElement('a');
          a.href = url;
          a.download = filename;

          // Reset transparent background flag
          if (transparent && p5InstanceRef.current) {
            p5InstanceRef.current.captureWithTransparentBackground = false;
          }
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          isRecordingRef.current = false;
          console.log('P5Canvas: Recording completed and downloaded');
        };

        isRecordingRef.current = true;
        mediaRecorderRef.current.start();

        // Auto-stop after duration
        setTimeout(() => {
          if (mediaRecorderRef.current && isRecordingRef.current) {
            mediaRecorderRef.current.stop();
          }
        }, duration * 1000);

      } catch (error) {
        console.error('P5Canvas: Error starting recording:', error);
        isRecordingRef.current = false;
      }
    },

    stopRecording: () => {
      if (mediaRecorderRef.current && isRecordingRef.current) {
        console.log('P5Canvas: Stopping recording manually');
        mediaRecorderRef.current.stop();
      }
    },

    get isRecording() {
      return isRecordingRef.current;
    }
  }));

  useEffect(() => {
    console.log('P5Canvas: useEffect running - CLIENT SIDE');

    // Clean up previous instance if it exists
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }

    const initializeSketch = async () => {
      try {
        console.log('P5Canvas: Loading p5 and creating template sketch');
        const sketchFactory = createTemplateSketch(containerRef);
        p5InstanceRef.current = await sketchFactory(params);
        console.log('P5Canvas: Template sketch created successfully');
      } catch (error) {
        console.error('P5Canvas: Error creating template sketch:', error);
      }
    };

    initializeSketch();

    // Cleanup function
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  // Handle parameter updates without recreating the entire sketch
  useEffect(() => {
    if (p5InstanceRef.current && p5InstanceRef.current.updateParams) {
      console.log('P5Canvas: Updating params with isPaused:', isPaused);
      p5InstanceRef.current.updateParams({ ...params, isPaused });
    }
  }, [params, isPaused]);

  console.log('P5Canvas: Rendering component');

  return (
    <div className="flex-1 h-full overflow-hidden">
      <div ref={containerRef} className="w-full h-full">
        {/* p5 canvas will be created here */}
      </div>
    </div>
  );
});

P5Canvas.displayName = 'P5Canvas';

export default P5Canvas;
