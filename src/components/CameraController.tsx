import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useCameraContext } from '../context/CameraContext';

// CameraController Component
// This component runs inside the Canvas and connects the Three.js camera to our CameraContext
// It should be placed as a child of <Canvas> in your CanvasComponent
//
// What it does:
// 1. Gets the camera from React Three Fiber using useThree()
// 2. Stores it in the CameraContext so buttons can access it
// 3. Enables communication between buttons (outside Canvas) and camera (inside Canvas)
//
// Usage: Add <CameraController /> as a child of <Canvas> in CanvasComponent

export function CameraController() {
  const { camera } = useThree();
  const { camera: contextCameraRef } = useCameraContext();

  // Store the camera reference in context when component mounts
  useEffect(() => {
    contextCameraRef.current = camera;
  }, [camera, contextCameraRef]);

  // This component doesn't render anything visual
  return null;
}
