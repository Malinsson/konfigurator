import type { StepName } from '../../../context/WatchConfigContext';
import styles from './StepBar.module.css';
import { StepItem } from './StepItem';

export const STEP_NAMES: StepName = {
  band: '1. Strap',
  dialColor: '2. Dial Color',
  dialDetails: '3. Dial Style & Detail',
  overview: '4. Overview'
};

export function StepBar({currentStep}: {currentStep: string | undefined}) {

  return (
    <div className={styles.stepBar}>
      {Object.entries(STEP_NAMES).map(([step, name]) => (
        <StepItem key={step} step={name} isActive={currentStep === step} />
      ))}
    </div>
  );
}