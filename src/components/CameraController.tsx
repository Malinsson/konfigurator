import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei'
import { useWatchConfig, type Step } from '../context/WatchConfigContext'

export type ViewId = 'top' | 'face' | 'band' | 'overview';

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
    position: [0, 3, 0.02],
    target: [0, 0, 0],
    minPolar: 0.05,
    maxPolar: 0.35,
    minAzimuth: -0.3,
    maxAzimuth: 0.3,
  },
  face: {
    position: [0, 3, 0.05], 
    target: [0, 0, 0],
    minPolar: 0.15,
    maxPolar: Math.PI / 2 - 0.05,
    minAzimuth: -Infinity,   
    maxAzimuth: Infinity,
  },
  band: {
    position: [2, 3, 2.5], 
    target: [0, -1, 0],       
    minPolar: 0.2,
    maxPolar: Math.PI - 0.2, 
    minAzimuth: -Math.PI,
    maxAzimuth: Math.PI,    
  },
  overview: {
    position: [1, 4, 2.5],
    target: [0, -1, 0],
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
  
  return <CameraControls ref={controlsRef} dollySpeed={0} makeDefault />
  

}
