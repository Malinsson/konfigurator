import styles from './CanvasComponent.module.css'
import { useRef, useState } from 'react'
import { Canvas, type ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { CameraController, type ViewId } from './CameraController'
import * as THREE from 'three'
import clockModel from '../assets/models/clock.glb?url'

// Clock model component - loads and displays the clock.glb model
function Clock(props: ThreeElements['group']) {
  const { scene } = useGLTF(clockModel)
  const groupRef = useRef<THREE.Group>(null)
  const [clicked, click] = useState(false)


  return (
    <group
      {...props}
      ref={groupRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
    >
      <primitive object={scene} />
    </group>
  )
}

function CanvasComponent({view}: {view: ViewId}) {

  return (
    <section className={styles.home}>
      <Canvas>
        <CameraController view={view} />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Clock position={[0, 0, 0]} />
      </Canvas>
    </section>
  )
}

export default CanvasComponent