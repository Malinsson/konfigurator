import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei'
import { useWatchConfig, type Step } from '../context/WatchConfigContext'


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
    position: [-0.05, 6, 0.5],
    target: [0, 0, 0],
    minPolar: 0.5,
    maxPolar: Math.PI / 2 - 0.05,
    minAzimuth: -0.6,
    maxAzimuth: 0.6,
  },
  face: {
    position: [0, 3.8, 0.5],
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

export function CameraController() {
    const { currentStep } = useWatchConfig()
    const controlsRef = useRef<CameraControls>(null)

    const stepViews: Record<Step, ViewId> = {
      start: 'top',
      band: 'band',
      dialColor: 'face',
      dialDetails: 'face',
      overview: 'top',
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
