# Watch Configurator

A browser-based watch configurator built with React, TypeScript, Vite, and Three.js. Users can customize a 3D watch by selecting the strap, dial color, and dial details, then review the complete configuration before adding it to the cart.

## Features

- Interactive 3D watch preview rendered with React Three Fiber
- Strap material and color selection
- Dial color selection
- Dial index and background/detail selection
- Step-by-step configuration panel with previous/next navigation
- Overview of all selected options and the current total price
- Camera zoom-to-hotspot support for focused views of the 3D model
- Responsive component styling with CSS Modules

The current prototype uses a fixed total price of **2500 kr**. The “Add to Cart” action currently logs the selected configuration to the browser console and does not connect to a backend or shopping cart service.

## Tech Stack

- React 19
- TypeScript
- Vite
- Three.js with `@react-three/fiber` and `@react-three/drei`
- CSS Modules
- Oxlint

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Project Structure

```text
src/
├── assets/
│   ├── icons/                 UI icons
│   ├── materials/             Material assets
│   └── models/                3D models, including the watch GLB
├── atoms/                     Small reusable UI primitives
├── components/
│   ├── Configurator/          Configuration flow and option steps
│   ├── CanvasComponent.tsx    Three.js canvas and watch model
│   ├── CameraController.tsx   Camera integration
│   ├── header/                Application header
│   └── layout/                Main page layout
├── config/                    Camera hotspot configuration
├── context/
│   ├── CameraContext.tsx      Shared camera and zoom state
│   └── WatchConfigContext.tsx Shared configuration state
├── hooks/                     Reusable interaction logic
├── molecules/                 Composed UI controls, including zoom buttons
├── App.tsx                    Application composition
└── main.tsx                   React entry point
```

## How It Works

`WatchConfigContext` stores the active step and the user's selections. The configuration panel renders the relevant step component and updates that shared state. `CanvasComponent` reads the selections and updates the watch model's materials so the 3D preview reflects the current configuration.

Camera zoom is managed separately through `CameraContext`, `CameraController`, and the `useZoomToSpot` hook. Zoom targets can be adjusted in `src/config/hotspots.config.ts`.

## Adding or Changing Options

The available strap, dial color, and dial detail options are defined in:

```text
src/components/Configurator/types.ts
```

When adding an option, update the relevant option list and confirm that the corresponding step component and model-material logic handle its value. For new zoom locations, add a hotspot to `src/config/hotspots.config.ts` and use `ZoomButton` or `useCameraContext` to trigger it.

## Related Documentation

- [3D camera zoom setup guide](src/ZOOM_SETUP_GUIDE.md)
