# 3D Camera Zoom Setup Guide

This guide explains how the zoom-to-hotspot system works and how to use it in your application.

## Overview

The zoom system allows buttons to smoothly animate the 3D camera to specific designated positions on your 3D object. It consists of five main pieces:

1. **Hotspots Config** (`config/hotspots.config.ts`) - Defines zoom target locations
2. **Camera Context** (`context/CameraContext.tsx`) - Provides access to camera across components
3. **Zoom Hook** (`hooks/useZoomToSpot.ts`) - Handles animation logic
4. **Camera Controller** (`components/CameraController.tsx`) - Connects Three.js camera to context
5. **Zoom Button** (`molecules/ZoomButton.tsx`) - Reusable zoom button molecule

## How It Works

```
User clicks button
    ↓
Button calls zoomToSpot('hotspotName')
    ↓
Context passes hotspot data to useZoomToSpot hook
    ↓
Hook animates camera position smoothly
    ↓
3D object appears to zoom to selected spot
```

## Step-by-Step Integration

### 1. Wrap your app with CameraProvider

In your main App or layout component:

```tsx
import { CameraProvider } from './context/CameraContext';
import CanvasComponent from './components/CanvasComponent';
import TestButtonGroup from './components/TestButtonGroup';

function App() {
  return (
    <CameraProvider>
      <CanvasComponent />
      <TestButtonGroup>
        {/* Zoom buttons go here */}
      </TestButtonGroup>
    </CameraProvider>
  );
}
```

### 2. Add CameraController inside Canvas

In your `CanvasComponent.tsx`, add `<CameraController />` as a child of `<Canvas>`:

```tsx
import { CameraController } from './CameraController';

function CanvasComponent() {
  return (
    <section>
      <Canvas>
        <CameraController /> {/* Add this line */}
        
        {/* Your 3D objects, lights, etc. */}
        <ambientLight intensity={Math.PI / 2} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </section>
  );
}
```

### 3. Define your hotspots

Edit `config/hotspots.config.ts` to add zoom points for your 3D object:

```ts
export const HOTSPOTS: Record<string, HotspotConfig> = {
  front: {
    name: 'front',
    label: 'Front View',
    position: [0, 0, 5],      // Where camera moves to
    target: [0, 0, 0],        // What point camera looks at
    duration: 800,            // Animation time in ms
  },
  detail: {
    name: 'detail',
    label: 'Detail View',
    position: [2, 1, 3],
    target: [1, 0.5, 0],
    duration: 800,
  },
  // Add more hotspots as needed
};
```

### 4. Create zoom buttons

Option A: Use the pre-built ZoomButton molecule:

```tsx
import { ZoomButton } from './molecules/ZoomButton';

function TestButtonGroup() {
  return (
    <div>
      <ZoomButton hotspotName="front" />
      <ZoomButton hotspotName="detail" />
    </div>
  );
}
```

Option B: Create custom buttons with zoom functionality:

```tsx
import Button from './molecules/Button';
import { useCameraContext } from './context/CameraContext';

function MyCustomButton() {
  const { zoomToSpot } = useCameraContext();
  
  return (
    <Button
      buttonName="Zoom Front"
      buttonColor="gold"
      onClick={() => zoomToSpot('front')}
      ariaLabel="Zoom to front view"
    />
  );
}
```

## Customizing Zoom Animation

### Adjust speed

Change the `duration` value in `config/hotspots.config.ts` (in milliseconds):
- Lower = faster zoom
- Higher = slower zoom

```ts
front: {
  duration: 500,  // Fast zoom
}
```

### Adjust easing (smoothness)

Edit the easing function in `hooks/useZoomToSpot.ts`:

Current easing: ease-in-out (smooth start and end)

Available alternatives:
- Linear: `const easeProgress = progress;`
- Ease-in (slow start): `const easeProgress = progress * progress;`
- Ease-out (slow end): `const easeProgress = 1 - (1 - progress) * (1 - progress);`

## Troubleshooting

### "useCameraContext must be used within a CameraProvider"
- Make sure `<CameraProvider>` wraps your entire component tree
- Check that it wraps both CanvasComponent and your button components

### Camera doesn't zoom
- Verify `<CameraController />` is inside the `<Canvas>` component
- Check that hotspot coordinates make sense for your 3D scene
- Open browser console to see any warning messages

### Zoom doesn't look right
- Adjust `position` and `target` values in `config/hotspots.config.ts`
- Try different `duration` values
- Make sure your 3D object is centered at origin [0, 0, 0]

## File Structure

```
src/
├── config/
│   └── hotspots.config.ts      (Define zoom target positions)
├── context/
│   └── CameraContext.tsx        (Provides camera to components)
├── hooks/
│   └── useZoomToSpot.ts        (Animation logic)
├── atoms/
│   ├── Button.tsx              (Primitive button atom)
│   └── Button.module.css        (Button styles)
├── molecules/
│   └── ZoomButton.tsx           (Composed molecule: Button + zoom logic)
└── components/
    ├── CameraController.tsx     (Connect camera to context)
    └── CanvasComponent.tsx      (Include CameraController here)
```

## Component Architecture (Atomic Design)

The project uses **Atomic Design** principles for organized component hierarchy:

- **Atoms** (`atoms/`): Primitive, standalone components
  - Example: `Button.tsx` - Generic button with no business logic
  - Used as building blocks for molecules

- **Molecules** (`molecules/`): Composed components that combine atoms + logic
  - Example: `ZoomButton.tsx` - Button + camera zoom functionality
  - Reusable and self-contained business logic

- **Organisms** (`components/`): Complex components, full sections, features
  - Example: `CanvasComponent.tsx`, `CameraController.tsx`
  - Combine molecules and manage feature-level logic

## Key Concepts for Your Partner

- **Context**: Think of it as a shared storage box that any component can access
- **Hook**: A reusable function that manages state and logic
- **Ref**: A way to directly access a DOM/Three.js element
- **Animation Frame**: The browser tells us when to update for smooth 60fps animation
- **Easing**: Math function that makes animations feel natural (not mechanical)
- **Atomic Design**: Component organization from simple (atoms) → complex (organisms)

## Next Steps

1. Add hotspots for each important view of your 3D object
2. Create zoom buttons in your UI
3. Test the camera movements and adjust positions/durations
4. Fine-tune the zoom speed and easing for your use case
