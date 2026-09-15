import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei'
import { useWatchConfig, type Step } from '../context/WatchConfigContext'

export type ViewId = 'top' | 'face' | 'band' | 'overview';

type ViewConfig = {
  position: [number, number, number]
  target: [number, number, number]
  fov?: number
  minPolar: number
  maxPolar: number
  minAzimuth: number
  maxAzimuth: number
}

const VIEWS: Record<ViewId, ViewConfig> = {
  top: {
    position: [0, 2.5, 0.02],
    target: [0, 0, 0],
    fov: 30,
    minPolar: 0.05,
    maxPolar: 0.35,
    minAzimuth: -0.3,
    maxAzimuth: 0.3,
  },
  face: {
    position: [0, 2, 0.05],   // much closer than 'top' — this is the zoom
    target: [0, 0, 0],
    fov: 20,                      // narrower fov = more "macro lens" feel
    minPolar: 0.15,
    maxPolar: Math.PI / 2 - 0.05,
    minAzimuth: -Infinity,   // full spin around the dial
    maxAzimuth: Infinity,
  },
  band: {
    position: [1, 1.5, 2.5], // off to the side (x) rather than dead-on (z)
    target: [0, -1, 0],        // aim slightly low, toward the strap/clasp
    fov: 35,
    minPolar: 0.2,
    maxPolar: Math.PI - 0.2, // wide range — lets user rotate to see the clasp on the bottom
    minAzimuth: -Math.PI,
    maxAzimuth: Math.PI,     // effectively free horizontal rotation too
  },
  overview: {
    position: [1, 2, 2.5],
    target: [0, -1, 0],
    fov: 40,
    minPolar: 0.1,
    maxPolar: Math.PI / 2 - 0.1,
    minAzimuth: -Infinity,
    maxAzimuth: Infinity,
  }
}

export function CameraController() {
    const { currentStep } = useWatchConfig()
    const controlsRef = useRef<CameraControls>(null)

    const stepViews: Record<Step, ViewId> = {
      start: 'top',
      band: 'band',
      watchCase: 'face',
      dialDetails: 'face',
      dialColor: 'face',
      overview: 'overview',
    }

    const activeView = stepViews[currentStep]

    useEffect(() => {
      const controls = controlsRef.current
      if (!controls) return
      
      const cfg = VIEWS[activeView]
      
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
    }, [activeView])
  
  return <CameraControls ref={controlsRef} makeDefault />
  

}
