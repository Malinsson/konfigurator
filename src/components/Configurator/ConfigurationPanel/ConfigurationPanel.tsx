import styles from './ConfigurationPanel.module.css';
import { type ComponentType } from 'react';
import { useWatchConfig, type Step } from '../../../context/WatchConfigContext';
import { ConfigurationHeader } from './ConfigurationHeader';
import BandStep from '../StepContent/BandStep';
import DialColorStep from '../StepContent/DialColorStep';
import OverviewStep from '../StepContent/OverviewStep';
import DialDetailsStep from '../StepContent/DialDetailsStep';
import { ConfigurationFooter } from './ConfigurationFooter';

const STEP_CONTENT: Partial<Record<Step, ComponentType>> = {
  band: BandStep,
  dialColor: DialColorStep,
  dialDetails: DialDetailsStep,
  overview: OverviewStep,
};

export default function ConfigurationPanel() {

  const { currentStep, goToNextStep, goToPreviousStep } = useWatchConfig();
  const StepContent = STEP_CONTENT[currentStep];

  return (
    <article className={`${currentStep === 'start' || currentStep === 'overview' ? styles.centerPosition : styles.configurationPanel}`}>
      <div className={styles.container}>

        {currentStep !== 'overview' && <ConfigurationHeader />}

        {StepContent && <StepContent />}

        <ConfigurationFooter
          currentStep={currentStep}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
        />
      </div>
    </article>
  );
}