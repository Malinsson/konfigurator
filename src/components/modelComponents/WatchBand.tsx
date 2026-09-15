import metal_band from './../../assets/models/metal_band.glb?url';
import leather_band from './../../assets/models/leather_band.glb?url';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { BAND_CONFIGS, type BandType } from '../../config/band.config'

type WatchBandProps = {
    colors: Record<string, string>;
    type: BandType;
};

export function WatchBand({colors, type}: WatchBandProps) {
    const config = BAND_CONFIGS[type]

    const { scene } = useGLTF(config.url);

    const cloned = useMemo(() => scene.clone(true), [scene])

    const meshColors = useMemo(() => {
    const result: Record<string, string> = {}
    for (const [slot, meshName] of Object.entries(config.meshMap)) {
      if (colors[slot]) result[meshName] = colors[slot]
    }
    return result
  }, [config, colors])

    useEffect(() => {
        cloned.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const mat = (child.material as THREE.MeshStandardMaterial).clone()
        mat.color.set(meshColors[child.name] || '#ffffff')
            child.material = mat
        }
        })
    }, [cloned, meshColors])

    return <primitive object={cloned} />;
}

useGLTF.preload(metal_band);
useGLTF.preload(leather_band);