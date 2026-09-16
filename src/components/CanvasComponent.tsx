import styles from './CanvasComponent.module.css'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { CameraController } from './CameraController'
import { useWatchConfig } from '../context/WatchConfigContext'
import { WatchBody } from './modelComponents/WatchBody'
import { WatchBand } from './modelComponents/WatchBand'
import { WatchIndex } from './modelComponents/WatchIndex'
import { WatchBackground } from './modelComponents/WatchBackground'
import * as THREE from 'three'

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner} role="status" aria-live="polite" aria-label="Loading watch model">
      <div className={styles.spinner} aria-hidden="true"></div>
      <p>Loading watch model...</p>
    </div>
  )
}

function CanvasComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const { selections } = useWatchConfig();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const bodyColor = selections.watchCaseColor === 'gold' ? '#d4af37' : '#C0C0C0';

  const clockArmsColor = selections.dialDetails.color === 'gold' ? '#d4af37' : '#C0C0C0';

  const indexColor = clockArmsColor; // Use the same color as clock arms for the index

  const bandType = selections.band.category === 'steel' ? 'steel' : 'leather';

  const bandColor =
  selections.band.type === 'gold'
    ? '#d4af37'
    : selections.band.type === 'silver'
      ? '#C0C0C0'
      : selections.band.type === 'brown'
        ? '#472b19'
        : '#111111';

  const showIndex = selections.dialDetails.index === 'with' ? true : false;

  const backgroundColor = selections.dialColor === 'white' ? '#dfdfdf' : '#000000';

  // Generate accessible description of watch configuration
  const watchDescription = `Watch preview: ${selections.band.category || 'unselected'} band in ${selections.band.type || 'unselected'} color, ${selections.watchCaseColor || 'unselected'} watch case, ${selections.dialDetails.index || 'unselected'} index lines in ${selections.dialDetails.color || 'unselected'}, ${selections.dialColor || 'unselected'} dial.`;

  return (
    <section className={styles.home}>
      {isLoading && <LoadingSpinner />}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {watchDescription}
      </div>
      <div className={styles.srOnly} role="region" aria-label="3D model keyboard controls">
        <p>3D Model Controls: Use arrow keys to rotate, + to zoom in, - to zoom out, ? for help</p>
        <p>Keyboard Shortcuts: Arrow Up/Down/Left/Right to rotate, Plus to zoom in, Minus to zoom out</p>
      </div>
      <Canvas
        camera= {{ fov: 50 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
          antialias: true,
        }}
        role="img"
        aria-label={watchDescription}
        tabIndex={0}
        >
        <Environment preset="warehouse" background={false} />
        <CameraController />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[15, 15, 15]} angle={0.15} penumbra={1} decay={0} intensity={0.4} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={0.3} />
        <Suspense fallback={null}>

          < WatchBody 
            bodyColor={bodyColor}
            clockArmsColor={clockArmsColor} />

          < WatchBand 
            type={bandType} 
            colors={bandType === 'steel' ? { strap: bandColor } : { strap: bandColor, stitching: '#402b09', clasp: bodyColor }}
          />

          {showIndex && <WatchIndex color={indexColor} />}

          < WatchBackground color={backgroundColor} />

        </Suspense>
      </Canvas>
    </section>
  )
}

export default CanvasComponent