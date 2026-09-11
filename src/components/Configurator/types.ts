// Generic Interfaces for ConfigurationPanel
export interface Option {
  id: string;
  label: string;
  [key: string]: unknown; // Optional, can be used for additional data
}

export interface OptionGroup {
  label: string;
  options: Option[];
  subOptions?: Record<string, Option[]>; // Optional, for nested options like metal > gold, silver, etc.
}

// Band Configuration
export interface BandMaterialOption {
  id: string;
  label: string; // 'Gold', 'Silver', 'Brown', 'Black', etc.
  materialType: 'steel' | 'leather';
}

export interface BandOption {
  material: BandMaterialOption;
}

// CONSTANT - the actual data that matches the interface
export const BAND_OPTIONS: OptionGroup = {
  label: 'Band',
  options: [
    { id: 'steel', label: 'Steel' },
    { id: 'leather', label: 'Leather' },
  ],
  subOptions: {
    steel: [
      { id: 'silver', label: 'Silver' },
      { id: 'gold', label: 'Gold' },
    ],
    leather: [
      { id: 'black', label: 'Black' },
      { id: 'brown', label: 'Brown' },
    ],
  },
} as const satisfies OptionGroup;

// Dial Color Configuration
export interface DialColorOption {
  id: string;
  label: string;
  value: string;
}

export const DIAL_COLOR_OPTIONS: DialColorOption[] = [
  { id: 'gold', label: 'Gold', value: '#FFD700' },
  { id: 'silver', label: 'Silver', value: '#C0C0C0' },
];

// Dial Details Configuration
export interface DialDetailsOption {
  background: 'west' | 'white' | 'black';
  index: 'with-lines' | 'without-lines';
}

export const DIAL_DETAILS_OPTIONS = {
  background: [
    { id: 'west', label: 'West' },
    { id: 'white', label: 'White' },
    { id: 'black', label: 'Black' },
  ],
  index: [
    { id: 'with-lines', label: 'With Index Lines' },
    { id: 'without-lines', label: 'Without Index Lines' },
  ],
} as const satisfies Record<keyof DialDetailsOption, readonly Option[]>;

// Overall Watch Configuration State
export interface WatchConfiguration {
  band: BandOption | null;
  dialColor: DialColorOption | null;
  dialDetails: DialDetailsOption | null;
}

// ============================================================================
// COMPONENT PROPS INTERFACES
// ============================================================================

// ConfigurationPanel Component Props
export interface ConfigurationPanelProps {
  options: Option[] | OptionGroup[];
  currentSelection: any;
  onSelect: (selection: any) => void;
  onNext: () => void;
  onPrevious?: () => void;
}

// OptionButton Component Props
export interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

// Step Component Props - shared by all step components (BandStep, DialColorStep, etc.)
export interface StepProps {
  onNext: () => void;
  onPrevious?: () => void;
}