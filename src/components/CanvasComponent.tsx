import styles from './CanvasComponent.module.css'
import { Suspense, useEffect, useRef } from 'react'
import { Canvas, type ThreeElements } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { CameraController } from './CameraController'
import * as THREE from 'three'
import clock_base from '../assets/models/clock_base.glb?url'
import { useWatchConfig } from '../context/WatchConfigContext'
import { WatchBody } from './modelComponents/WatchBody'
import { WatchBand } from './modelComponents/MetalBand'
import { WatchIndex } from './modelComponents/WatchIndex'
import { WatchBackground } from './modelComponents/WatchBackground'

// Add COnstant name for dial details mesh when we get it
const BAND_MESH_NAME = 'metal013'
const DIAL_MESH_NAME = 'Circle004'


// Clock model component - loads and displays the clock.glb model
function Clock(props: ThreeElements['group']) {
  const { scene } = useGLTF(clock_base)
  const groupRef = useRef<THREE.Group>(null)
  const { selections } = useWatchConfig()

  // Log mesh structure for debugging (runs once on mount)
  useEffect(() => {
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return
      const mesh = child as THREE.Mesh
      console.log('Mesh name:', mesh.name, 'Material:', mesh.material)
    })
  }, [scene])

  useEffect(() => {
    // Update the colors of the band and dial meshes based on user selections
    const bandColor = ({
      gold: 0xd4af37,
      silver: 0xc0c0c0,
      brown: 0x6b3f24,
      black: 0x1b1b1b,
    }[selections.band.type || 'silver'] ?? 0xc0c0c0)

    // Set dial color based on selection
    const dialColor = selections.dialColor === 'gold' ? 0xd4af37 : 0xc0c0c0

    // Add a set dial details color if we have a mesh for it in the future

    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return

      const mesh = child as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true

      if (mesh.name !== BAND_MESH_NAME && mesh.name !== DIAL_MESH_NAME) return

      const color = mesh.name === BAND_MESH_NAME ? bandColor : dialColor
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
        <Suspense fallback={null}>
          {/*
        <Clock
          position={[-10, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />  Position should be 0, 0, 0 but moved back to avoid clipping with camera */}
        < WatchBody color={useWatchConfig().selections.dialColor === 'gold' ? '#d4af37' : '#c0c0c0'} />
        < WatchBand color={useWatchConfig().selections.band.type === 'gold' ? '#d4af37' : '#c0c0c0'} />
        < WatchIndex color={useWatchConfig().selections.dialColor === 'gold' ? '#d4af37' : '#c0c0c0'} />
        < WatchBackground color={useWatchConfig().selections.dialColor === 'gold' ? '#d4af37' : '#c0c0c0'} />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default CanvasComponent