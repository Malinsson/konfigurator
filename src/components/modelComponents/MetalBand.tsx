import metal_band from './../../assets/models/metal_band.glb?url';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export function WatchBand({color}: {color: string}) {
    const { scene } = useGLTF(metal_band);

    const cloned = useMemo(() => scene.clone(true), [scene])

    useEffect(() => {
        cloned.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const mat = (child.material as THREE.MeshStandardMaterial).clone()
            mat.color.set(color)
            child.material = mat
        }
        })
    }, [cloned, color])

    return <primitive object={cloned} />;
}

useGLTF.preload(metal_band);