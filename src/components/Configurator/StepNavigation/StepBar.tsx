import type { StepName } from '../../../context/WatchConfigContext';
import styles from './StepBar.module.css';
import { StepItem } from './StepItem';

type Steps = Omit<StepName, 'start'>; // Exclude 'start' from the steps

export const STEP_NAMES: Steps = {
  band: '1. Strap',
  dialColor: '2. Dial Color',
  dialDetails: '3. Dial Style & Detail',
  overview: '4. Overview'
};

export function StepBar({currentStep}: {currentStep: string | undefined}) {

  // Calculate the index of the active step for the indicator
  const activeStep = Object.keys(STEP_NAMES).findIndex((step) => step === currentStep);
  const indicatorStyle = {
  transform: `translateX(${activeStep * 168}%)`
};

  return (
    <div className={styles.stepBar}>

      <div className={styles.stepBarLine} style={indicatorStyle}></div>

      {Object.entries(STEP_NAMES).map(([step, name]) => (
        <StepItem key={step} step={name} isActive={currentStep === step || currentStep === 'start'} />
      ))}

    </div>
  );
}