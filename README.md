# Watch Configurator

A browser-based watch configurator built with React, TypeScript, Vite, and Three.js. Users can customize a 3D watch by selecting the strap, dial color, and dial details, then review the complete configuration before adding it to the cart.

## Features

- Interactive 3D watch preview rendered with React Three Fiber
- 5-step configuration flow:
  1. Strap material (steel/leather) and color selection
  2. Watch case color selection (silver/gold)
  3. Dial index lines (with/without) and color selection
  4. Dial color selection (black/white)
  5. Overview of all selected options
- Step-by-step navigation with visual step indicator
- Overview page summarizing all selected options and current total price
- Loading spinner during 3D model load
- Responsive component styling with CSS Modules

The current prototype uses a fixed total price of **2500 SEK**. The “Add to Cart” action currently logs the selected configuration to the browser console and does not connect to a backend or shopping cart service as this project is solely focused on the configuration aspect.

## Tech Stack

- React 19
- TypeScript
- Vite
- Three.js with `@react-three/fiber` and `@react-three/drei`
- CSS Modules
- Oxlint

## Accessibility

The configurator is built with accessibility in mind and meets **WCAG 2.1 Level A** standards, with most components meeting **Level AA** standards.

### Key Accessibility Features

✅ **Keyboard Navigation**
- Tab through all interactive elements
- Arrow keys to rotate the 3D watch model
- `+` / `-` keys to zoom in/out
- `?` key for keyboard help

✅ **Screen Reader Support**
- Semantic HTML with proper form structure (fieldset/legend)
- ARIA labels on interactive elements
- Live regions for loading states and configuration updates
- Proper heading hierarchy
- Skip links to bypass navigation

✅ **Visual Accessibility**
- Consistent 2px focus indicators (outline + 2px offset) on all interactive elements
- Sufficient color contrast on most elements
- High-contrast focus states for keyboard users
- Loading spinner with screen reader announcement

✅ **3D Canvas Support**
- Canvas has proper `role="img"` and dynamic `aria-label`
- Keyboard controls allow interaction without mouse
- Configuration state is announced to screen readers

### Known Limitations

⚠️ **Color Contrast** (WCAG AA)
- Subtext color (#9C9B9B): 2.4:1 contrast - meets Level A, doesn't meet Level AA
- Disabled button color (#CDCDCD): 2.1:1 contrast - meets Level A, doesn't meet Level AA
- **Recommendation**: Consult design team about updating to #6B6969 and #999999 respectively

⚠️ **Touch Target Size** (WCAG AAA)
- Option buttons: 1.875rem (30px) - below recommended 44px
- **Recommendation**: Consider increasing to 2.75rem (44px) for better mobile accessibility

### Testing Accessibility

For comprehensive accessibility testing, see [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) which includes:
- Screen reader testing procedures
- Keyboard navigation test cases
- Color contrast verification
- Focus indicator testing
- Automated testing tool recommendations

### Compliance Summary

| Standard | Status |
|----------|--------|
| WCAG 2.1 Level A | ✅ Meets |
| WCAG 2.1 Level AA | ⚠️ Mostly meets (color contrast pending design review) |
| WCAG 2.1 Level AAA | ❌ Does not meet |

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
│   ├── icons/                 UI icons (index lines, cart icon)
│   ├── logos/                 Logo assets
│   └── models/                3D models (watch components)
├── components/
│   ├── Configurator/          Configuration flow and step components
│   │   ├── ConfigurationPanel/    Main configuration container
│   │   ├── StepContent/           Individual step components
│   │   ├── StepNavigation/        Step indicator and navigation
│   │   └── types.ts              Option definitions
│   ├── modelComponents/       3D model parts (WatchBody, WatchBand, etc.)
│   ├── CanvasComponent.tsx    Three.js canvas and loading spinner
│   ├── CameraController.tsx   Camera zoom control
│   ├── header/                Application header with logo
│   └── layout/                Main page layout
├── atoms/                     Basic UI components (currently unused)
├── molecules/                 Composed UI controls (OptionGroup, OptionButton)
├── config/                    Camera hotspot configuration
├── context/
│   ├── CameraContext.tsx      Shared camera state
│   └── WatchConfigContext.tsx Shared watch configuration state
├── hooks/                     Reusable interaction logic
├── App.tsx                    Application composition
└── main.tsx                   React entry point
```

## How It Works

**State Management:** `WatchConfigContext` manages the current step and all user selections (band, watch case, dial details, dial color). The configuration panel reads from context and updates selections as users interact with the UI.

**3D Preview:** `CanvasComponent` contains the Three.js canvas and reads selections from context to update the watch model's materials and appearance in real-time. Models are loaded through `@react-three/drei` and wrapped in Suspense for loading state management.

**Navigation:** The step bar shows all 5 steps with a dynamic underline indicator tracking the active step. Users navigate with Previous/Next buttons in the footer.

**Camera Control:** `CameraController` manages different camera views for each configuration step to focus on the relevant part of the watch.

## Adding or Changing Options

Configuration options are defined in `src/components/Configurator/types.ts`:

- `BAND_OPTIONS` - Strap materials and colors
- `WATCH_CASE_COLOR_OPTIONS` - Watch case colors (silver/gold)
- `DIAL_COLOR_OPTIONS` - Dial colors (black/white)
- `DIAL_DETAILS_OPTIONS` - Index lines (with/without) and colors

**To add/modify options:**

1. Update the option list in `types.ts`
2. Update the corresponding step component in `StepContent/`
3. Update `WatchConfigContext` if adding a new configuration type
4. Update color mappings in `CanvasComponent.tsx` if adding new colors
5. Add CSS color classes in `index.css` for styling

