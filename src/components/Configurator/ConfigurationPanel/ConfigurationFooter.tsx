import styles from './ConfigurationFooter.module.css'
import { NavigationButton } from '../StepNavigation/NavigationButton'
import type { Step } from '../../../context/WatchConfigContext';

type ConfigurationFooterProps = {
  currentStep: Step;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

export function ConfigurationFooter({currentStep, goToNextStep, goToPreviousStep}: ConfigurationFooterProps) {

    if (currentStep === 'overview') {
        return
    };

    return (
        <div className={styles.stepFooter}>
          <NavigationButton stepDirection="back" onClick={goToPreviousStep} />
          <NavigationButton stepDirection="next" onClick={goToNextStep} />
        </div>
    );
}