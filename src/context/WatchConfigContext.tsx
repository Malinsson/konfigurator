import { createContext, useContext, useState, type ReactNode } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// Define what each step looks like
export type Step = 'start' | 'band' | 'dialColor' | 'dialDetails' | 'overview';

export type StepName = {
  [key in Step]: string;
};

// Band selection structure
export interface BandSelection {
  category: 'steel' | 'leather' | null;
  type: string | null; // 'gold', 'silver', 'brown', 'black', 'white'
}

// Dial Details selection structure
export interface DialDetailsSelection {
  background: 'west' | 'white' | 'black' | null;
  index: 'with' | 'without' | null;
}

// All user selections
export interface WatchSelections {
  band: BandSelection;
  dialColor: 'gold' | 'silver' | null;
  dialDetails: DialDetailsSelection;
}

// The context type - what data and functions will be available
export interface WatchConfigContextType {
  // State
  currentStep: Step;
  selections: WatchSelections;
  isStarted: boolean;

  // Actions
  startConfigurator: () => void;
  goToStep: (step: Step) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateBandSelection: (category: BandSelection['category'], type: string) => void;
  updateDialColor: (color: 'gold' | 'silver') => void;
  updateDialDetails: (background: DialDetailsSelection['background'], index: DialDetailsSelection['index']) => void;
  resetConfigurator: () => void;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const WatchConfigContext = createContext<WatchConfigContextType | null>(null);

// ============================================================================
// DEFAULT STATE
// ============================================================================

const DEFAULT_SELECTIONS: WatchSelections = {
  band: { category: null, type: null },
  dialColor: null,
  dialDetails: { background: null, index: null },
};

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface WatchConfigProviderProps {
  children: ReactNode;
}

export function WatchConfigProvider({ children }: WatchConfigProviderProps) {
  // State
  const [currentStep, setCurrentStep] = useState<Step>('start');
  const [selections, setSelections] = useState<WatchSelections>(DEFAULT_SELECTIONS);
  const [isStarted, setIsStarted] = useState(false);

  // Step order for navigation
  const STEP_ORDER: Step[] = ['start', 'band', 'dialColor', 'dialDetails', 'overview'];

  // Actions
  const startConfigurator = () => {
    setIsStarted(true);
    setCurrentStep('band');
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
    }
  };

  const updateBandSelection = (category: BandSelection['category'], type: string) => {
    setSelections((prev) => ({
      ...prev,
      band: { category, type },
    }));
  };

  const updateDialColor = (color: 'gold' | 'silver') => {
    setSelections((prev) => ({
      ...prev,
      dialColor: color,
    }));
  };

  const updateDialDetails = (
    background: DialDetailsSelection['background'],
    index: DialDetailsSelection['index']
  ) => {
    setSelections((prev) => ({
      ...prev,
      dialDetails: { background, index },
    }));
  };

  const resetConfigurator = () => {
    setIsStarted(false);
    setCurrentStep('start');
    setSelections(DEFAULT_SELECTIONS);
  };

  // Create the value object that will be provided
  const value: WatchConfigContextType = {
    currentStep,
    selections,
    isStarted,
    startConfigurator,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    updateBandSelection,
    updateDialColor,
    updateDialDetails,
    resetConfigurator,
  };

  return (
    <WatchConfigContext.Provider value={value}>
      {children}
    </WatchConfigContext.Provider>
  );
}

// ============================================================================
// CUSTOM HOOK - USE THIS TO ACCESS THE CONTEXT
// ============================================================================

export function useWatchConfig(): WatchConfigContextType {
  const context = useContext(WatchConfigContext);
  if (!context) {
    throw new Error(
      'useWatchConfig must be used within a WatchConfigProvider. ' +
      'Make sure to wrap your component tree with <WatchConfigProvider>'
    );
  }
  return context;
}
