import watch_body from './../../assets/models/watch_body.glb?url';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

type WatchBodyProps = {
    bodyColor: string;
    clockArmsColor: string;
};

export function WatchBody({bodyColor, clockArmsColor}: WatchBodyProps) {

    const { scene } = useGLTF(watch_body);

    const cloned = useMemo(() => scene.clone(true), [scene])

    useEffect(() => {
        const meshColors: Record<string, string> = {
            'watch_body': bodyColor,
            'watch_body001' : clockArmsColor,
            'watch_body002' : clockArmsColor,
        };

        cloned.traverse((child) => {

            if (!(child instanceof THREE.Mesh)) return;

            if (child instanceof THREE.Mesh && child.name === 'watch_body_glass') {
                child.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color('#ffffff'),
                    transmission: 1,
                    roughness: 0.04,
                    metalness: 0,
                    thickness: 0.04,
                    ior: 1.5,
                    clearcoat: 1,
                    clearcoatRoughness: 0.02,
                    envMapIntensity: 1,
                    attenuationColor: new THREE.Color('#eef6ff'),
                    attenuationDistance: 0.6,
                    });
                child.material.depthWrite = false; // Helps with transparency blending
            }
            
            const color = meshColors[child.name];
            if (!color) return;
            
            if (Array.isArray(child.material)) {
                child.material = child.material.map((material) => {
                    const clonedMaterial = material.clone();
                    if ('color' in clonedMaterial) clonedMaterial.color.set(color);
                    return clonedMaterial;
                });
            } else {
                const clonedMaterial = child.material.clone();
                if ('color' in clonedMaterial) clonedMaterial.color.set(color);
                child.material = clonedMaterial;
            }
        });
    }, [cloned, bodyColor, clockArmsColor]);


    return <primitive object={cloned} />;
}

useGLTF.preload(watch_body);