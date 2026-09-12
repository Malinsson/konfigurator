import styles from './CanvasComponent.module.css'
import { useEffect, useRef } from 'react'
import { Canvas, type ThreeElements } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { CameraController } from './CameraController'
import * as THREE from 'three'
import clock_base from '../assets/models/clock_base.glb?url'
import { useWatchConfig } from '../context/WatchConfigContext'

// Clock model component - loads and displays the clock.glb model
function Clock(props: ThreeElements['group']) {
  const { scene } = useGLTF(clock_base)
  const groupRef = useRef<THREE.Group>(null)
  const { selections } = useWatchConfig()

  useEffect(() => {
    const bandColor = ({
      gold: 0xd4af37,
      silver: 0xc0c0c0,
      brown: 0x6b3f24,
      black: 0x1b1b1b,
    }[selections.band.type || 'silver'] ?? 0xc0c0c0)
    const dialColor = selections.dialColor === 'gold' ? 0xd4af37 : 0xc0c0c0

    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return

      const mesh = child as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true

      const color = mesh.name === 'Plane.015' ? bandColor : dialColor
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]

      materials.forEach((material) => {
        if ('color' in material) {
          (material as THREE.MeshStandardMaterial).color.setHex(color)
        }
      })
    })
  }, [scene, selections.band.type, selections.dialColor])


  return (
    <group
      {...props}
      ref={groupRef}
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