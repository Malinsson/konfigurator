// Hotspots Configuration
// This file defines all the zoom target points on your 3D object.
// Each hotspot represents a specific location/angle the camera should zoom to when a button is clicked.
//
// Structure:
// - name: unique identifier for the hotspot
// - label: display text for UI buttons
// - position: where the camera should move to [x, y, z]
// - target: what point in 3D space the camera should look at [x, y, z]
// - duration: how long the zoom animation should take (ms)

export interface HotspotConfig {
  name: string;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
  duration: number;
}

export const HOTSPOTS: Record<string, HotspotConfig> = {
  // Example hotspot - replace with your actual 3D object coordinates
  front: {
    name: 'front',
    label: 'Front',
    position: [0, 0, 5],
    target: [0, 0, 0],
    duration: 800,
  },
  top: {
    name: 'top',
    label: 'Top',
    position: [0, 5, 0],
    target: [0, 0, 0],
    duration: 800,
  },
  side: {
    name: 'side',
    label: 'Side',
    position: [5, 0, 0],
    target: [0, 0, 0],
    duration: 800,
  },
  // Add more hotspots as needed for your 3D object
};
