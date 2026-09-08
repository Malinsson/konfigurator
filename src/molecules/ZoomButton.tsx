import Button from '../atoms/Button';
import { useCameraContext } from '../context/CameraContext';
import { HOTSPOTS } from '../config/hotspots.config';

interface ZoomButtonProps {
  hotspotName: string;
}

// ZoomButton Component
// A button that zooms the camera to a specific hotspot when clicked
//
// How to use:
// <ZoomButton hotspotName="front" />
//
// The button will:
// 1. Look up the hotspot configuration from hotspots.config.ts
// 2. Call the zoom animation through the camera context
// 3. Smoothly animate the camera to the specified position
//
// To add more hotspots:
// 1. Add them to hotspots.config.ts
// 2. Use <ZoomButton hotspotName="newHotspotName" /> in your UI

export function ZoomButton({ hotspotName }: ZoomButtonProps) {
  // Get the zoomToSpot function from context
  const { zoomToSpot } = useCameraContext();

  // Get the hotspot config to display the label
  const hotspot = HOTSPOTS[hotspotName];

  if (!hotspot) {
    console.warn(`Hotspot "${hotspotName}" not found`);
    return null;
  }

  // Handle button click - trigger the zoom animation
  const handleZoom = () => {
    zoomToSpot(hotspotName);
  };

  return (
    <Button
      buttonName={hotspot.label}
      buttonColor="gold"
      variant="circleOutline"
      ariaLabel={`Zoom to ${hotspot.label}`}
      onClick={handleZoom}
    />
  );
}
