import React, { createContext, useContext, useRef, type ReactNode } from 'react';
import { Camera } from 'three';
import { useZoomToSpot } from '../hooks/useZoomToSpot';

// Define what the camera context will provide
interface CameraContextType {
  camera: React.MutableRefObject<Camera | null>;
  // Method to trigger zoom animation to a specific hotspot
  zoomToSpot: (hotspotName: string) => void;
}

// Create the context - this allows any child component to access the camera
const CameraContext = createContext<CameraContextType | null>(null);

interface CameraProviderProps {
  children: ReactNode;
}

// CameraProvider component wraps your entire app and provides camera access to all child components
//
// How to use:
// 1. Wrap your app (or at least CanvasComponent + buttons) with <CameraProvider>
// 2. Inside Canvas, add <CameraController /> to connect the Three.js camera to this context
// 3. In any button component, use: const { zoomToSpot } = useCameraContext();
//                                     then call: zoomToSpot('front')
//
// Example:
// <CameraProvider>
//   <CanvasComponent />
//   <TestButtonGroup>
//     <ZoomButton hotspot="front" />
//   </TestButtonGroup>
// </CameraProvider>

export function CameraProvider({ children }: CameraProviderProps) {
  const cameraRef = useRef<Camera | null>(null);

  // Use the zoom hook to get the zoomToSpot function
  const { zoomToSpot } = useZoomToSpot(cameraRef);

  const value: CameraContextType = {
    camera: cameraRef,
    zoomToSpot,
  };

  return (
    <CameraContext.Provider value={value}>
      {children}
    </CameraContext.Provider>
  );
}

// Custom hook to use the camera context
//
// Usage: const { camera, zoomToSpot } = useCameraContext();
//
// Then you can:
// - Access the camera: camera.current
// - Trigger zoom: zoomToSpot('hotspotName')
//
// Example in a button click handler:
// const { zoomToSpot } = useCameraContext();
// onClick={() => zoomToSpot('front')}

export function useCameraContext() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error(
      'useCameraContext must be used within a CameraProvider. Make sure to wrap your component tree with <CameraProvider>.'
    );
  }
  return context;
}
