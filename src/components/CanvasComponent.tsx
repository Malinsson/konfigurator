import styles from './CanvasComponent.module.css'
import { useRef, /*useState*/ } from 'react'
import { Canvas, type ThreeElements } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { CameraController } from './CameraController'
import * as THREE from 'three'
import clock_base from '../assets/models/clock_base.glb?url'

// Clock model component - loads and displays the clock.glb model
function Clock(props: ThreeElements['group']) {
  const { scene } = useGLTF(clock_base)
  const groupRef = useRef<THREE.Group>(null)
  console.log('Clock model loaded:', scene)
  //const [clicked, click] = useState(false)


  return (
    <group
      {...props}
      ref={groupRef}
      //scale={clicked ? 1.2 : 1}
      //onClick={() => click(!clicked)}
    >
      <primitive object={scene} />
    </group>
  )
}

function CanvasComponent() {

  return (
    <section className={styles.home}>
      <Canvas>
        <Environment preset="studio" background={false} />
        <CameraController />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Clock
          position={[-10, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        /> {/* Should be 0, 0, 0 but moved back to avoid clipping with camera */}
      </Canvas>
    </section>
  )
}

export default CanvasComponent