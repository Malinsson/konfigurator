import styles from './ConfigurationFooter.module.css'
import { NavigationButton } from '../StepNavigation/NavigationButton'
import type { Step } from '../../../context/WatchConfigContext';

type ConfigurationFooterProps = {
  currentStep: Step;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

export function ConfigurationFooter({currentStep, goToNextStep, goToPreviousStep}: ConfigurationFooterProps) {

  switch (currentStep) {
    case 'overview':
      return null;
    case 'band':
      return (
        <div className={`${styles.stepFooter} ${styles.firstStepFooter}`}>
            <NavigationButton stepDirection="next" onClick={goToNextStep} />
        </div>
    );
    default:
      return (
        <div className={styles.stepFooter}>
          <NavigationButton stepDirection="back" onClick={goToPreviousStep} />
          <NavigationButton stepDirection="next" onClick={goToNextStep} />
        </div>
    );
  }
}