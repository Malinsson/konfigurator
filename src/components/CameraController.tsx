import { useEffect, useRef } from 'react';
//import { useThree } from '@react-three/fiber';
//import { useCameraContext } from '../context/CameraContext';
import { CameraControls } from '@react-three/drei'


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

export type ViewId = 'top' | 'face' | 'band';

type ViewConfig = {
  position: [number, number, number]
  target: [number, number, number]
  minPolar: number
  maxPolar: number
  minAzimuth: number
  maxAzimuth: number
}

const VIEWS: Record<ViewId, ViewConfig> = {
  top: {
    position: [0, 6, 0.05],
    target: [0, 0, 0],
    minPolar: Math.PI / 2 - 0.2,
    maxPolar: Math.PI / 2 + 0.2,
    minAzimuth: -0.3,
    maxAzimuth: 0.3,
  },
  face: {
    position: [0, 2, 0.5],
    target: [0, 0, 0],
    minPolar: 0.15,
    maxPolar: Math.PI / 2 - 0.05,
    minAzimuth: -0.6,
    maxAzimuth: 0.6,
  },
  band: {
    position: [0, -5, 0.45],
    target: [0, -0.05, 0],
    minPolar: 0.2,
    maxPolar: Math.PI - 0.2,
    minAzimuth: -Math.PI,
    maxAzimuth: Math.PI,
  },
}

export function CameraController({ view }: { view: ViewId }) {
    const controlsRef = useRef<CameraControls>(null)

    //const { camera } = useThree();
    //const { camera: contextCameraRef } = useCameraContext();

  // Store the camera reference in context when component mounts
    //contextCameraRef.current = camera;
      useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    
    const cfg = VIEWS[view]
    
    // apply new constraints
    controls.minPolarAngle = cfg.minPolar
    controls.maxPolarAngle = cfg.maxPolar
    controls.minAzimuthAngle = cfg.minAzimuth
    controls.maxAzimuthAngle = cfg.maxAzimuth
    
    // animate camera to the new view's default framing
    controls.setLookAt(
      ...cfg.position,
      ...cfg.target,
      true // enableTransition
    )
    // Set default camera position to view from the top
    //camera.position.set(0, 5, 0);
    //camera.lookAt(0, 0, 0);
  //}, [camera, contextCameraRef]);
  }, [view])
  
  return <CameraControls ref={controlsRef} makeDefault />
  

  // This component doesn't render anything visual
  return null;
}
