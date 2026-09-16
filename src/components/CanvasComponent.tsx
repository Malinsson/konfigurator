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
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
      <p>Loading watch...</p>
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
        ? '#3b2415'
        : '#111111';

  const showIndex = selections.dialDetails.index === 'with' ? true : false;

  const backgroundColor = selections.dialColor === 'white' ? '#dfdfdf' : '#000000';


  return (
    <section className={styles.home}>
      {isLoading && <LoadingSpinner />}
      <Canvas
        camera= {{ fov: 50 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1, // tweak up/down to taste
          antialias: true,
        }}
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