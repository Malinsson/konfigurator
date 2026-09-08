import { useEffect, useRef, type RefObject } from 'react';
import { Camera, Vector3 } from 'three';
import { HOTSPOTS } from '../config/hotspots.config';

// This hook manages the camera animation when zooming to a specific hotspot
// It handles smooth interpolation from the current camera position to the target position
//
// Parameters:
// - cameraRef: reference to your Three.js camera object
//
// Returns:
// - zoomToSpot: function that takes a hotspot name and animates the camera to that position

interface UseZoomToSpotReturn {
  zoomToSpot: (hotspotName: string) => void;
}

export function useZoomToSpot(cameraRef: RefObject<Camera | null>): UseZoomToSpotReturn {
  // Track animation state so we can cancel previous animations if user clicks quickly
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const zoomToSpot = (hotspotName: string) => {
    const camera = cameraRef.current;
    if (!camera) {
      console.warn('Camera not available in useZoomToSpot');
      return;
    }

    const hotspot = HOTSPOTS[hotspotName];
    if (!hotspot) {
      console.warn(`Hotspot "${hotspotName}" not found in config`);
      return;
    }

    // Cancel any previous animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    isAnimatingRef.current = true;

    // Store the starting position and target position
    const startPosition = new Vector3(camera.position.x, camera.position.y, camera.position.z);
    const endPosition = new Vector3(...hotspot.position);
    const startTarget = new Vector3(0, 0, 0); // Assuming camera looks at origin
    const endTarget = new Vector3(...hotspot.target);

    const startTime = Date.now();
    const { duration } = hotspot;

    // Animation loop - smoothly interpolate camera position from start to end
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1); // Progress from 0 to 1

      // Easing function for smooth motion (ease-in-out)
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      // Interpolate position
      const currentX = startPosition.x + (endPosition.x - startPosition.x) * easeProgress;
      const currentY = startPosition.y + (endPosition.y - startPosition.y) * easeProgress;
      const currentZ = startPosition.z + (endPosition.z - startPosition.z) * easeProgress;

      camera.position.set(currentX, currentY, currentZ);

      // Interpolate where camera is looking
      const targetX = startTarget.x + (endTarget.x - startTarget.x) * easeProgress;
      const targetY = startTarget.y + (endTarget.y - startTarget.y) * easeProgress;
      const targetZ = startTarget.z + (endTarget.z - startTarget.z) * easeProgress;

      camera.lookAt(targetX, targetY, targetZ);

      // Continue animation if not finished
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        isAnimatingRef.current = false;
      }
    };

    animate();
  };

  return { zoomToSpot };
}
