import watch_background from './../../assets/models/watch_background.glb?url';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export function WatchBackground({color}: {color: string}) {
    const { scene } = useGLTF(watch_background);

    const cloned = useMemo(() => scene.clone(true), [scene])

    useEffect(() => {
        cloned.traverse((child) => {
            console.log(child.name);

        if (child instanceof THREE.Mesh && child.name === 'Cylinder005') {
            const mat = (child.material as THREE.MeshStandardMaterial).clone()
            mat.color.set(color)
            child.material = mat
        }
        })
    }, [cloned, color])

    return <primitive object={cloned} />;
}

useGLTF.preload(watch_background);