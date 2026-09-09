// types.ts

// Band Configuration
export interface BandMaterialOption {
  id: string;
  label: string; // 'Gold', 'Silver', 'Brown', 'Black', etc.
  materialType: 'metal' | 'leather' | 'rubber';
}

export interface BandOption {
  material: BandMaterialOption;
}

// Dial Color Configuration
export interface DialColorOption {
  id: string;
  label: string; // 'Gold' | 'Silver'
  value: string;
}

// Dial Details Configuration
export interface DialDetailsOption {
  background: 'gothenburg' | 'white' | 'black';
  index: 'with' | 'without';
}

// Overall Watch Configuration State
export interface WatchConfiguration {
  band: BandOption | null;
  dialColor: DialColorOption | null;
  dialDetails: DialDetailsOption | null;
}

// Accordion Types
export type ConfiguratorSection = 'band' | 'dialColor' | 'dialDetails';

export interface AccordionSectionConfig {
  id: ConfiguratorSection;
  label: string;
  onSectionOpen: () => void;
}

export interface AccordionItemProps {
  section: AccordionSectionConfig;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export interface AccordionProps {
  sections: AccordionSectionConfig[];
  children: React.ReactNode;
}