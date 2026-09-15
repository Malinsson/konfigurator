import styles from './CanvasComponent.module.css'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { CameraController } from './CameraController'
import { useWatchConfig } from '../context/WatchConfigContext'
import { WatchBody } from './modelComponents/WatchBody'
import { WatchBand } from './modelComponents/WatchBand'
import { WatchIndex } from './modelComponents/WatchIndex'
import { WatchBackground } from './modelComponents/WatchBackground'


function CanvasComponent() {
  
  const { selections } = useWatchConfig();

  const bodyColor = selections.watchCaseColor === 'gold' ? '#FFD700' : '#C0C0C0';

  const clockArmsColor = selections.dialDetails.color === 'gold' ? '#FFD700' : '#C0C0C0';

  const indexColor = clockArmsColor; // Use the same color as clock arms for the index

  const bandType = selections.band.category === 'steel' ? 'steel' : 'leather';

  const bandColor =
  selections.band.type === 'gold'
    ? '#FFD700'
    : selections.band.type === 'silver'
      ? '#C0C0C0'
      : selections.band.type === 'brown'
        ? '#8B4513'
        : '#111111';

  const showIndex = selections.dialDetails.index === 'with' ? true : false;

  const backgroundColor = selections.dialColor === 'white' ? '#ffffff' : '#000000';
  
  
  return (
    <section className={styles.home}>
      <Canvas camera= {{ fov: 50 }}>
        <Environment preset="dawn" background={false} />
        <CameraController />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense fallback={null}>

          < WatchBody 
            bodyColor={bodyColor}
            clockArmsColor={clockArmsColor} />

          < WatchBand 
            type={bandType} 
            colors={bandType === 'steel' ? { strap: bandColor, clasp: bandColor } : { strap: bandColor, stitching: '#402b09', clasp: bodyColor }}
          />

          {showIndex && <WatchIndex color={indexColor} />}

          < WatchBackground color={backgroundColor} />

        </Suspense>
      </Canvas>
    </section>
  )
}

export default CanvasComponent