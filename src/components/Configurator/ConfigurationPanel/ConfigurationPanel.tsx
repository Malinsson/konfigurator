import styles from './ConfigurationPanel.module.css';
import { type ComponentType } from 'react';
import { useWatchConfig, type Step } from '../../../context/WatchConfigContext';
import { ConfigurationHeader } from './ConfigurationHeader';
import BandStep from '../StepContent/BandStep';
import WatchCaseStep from '../StepContent/WatchCaseStep';
import DialDetailsStep from '../StepContent/DialDetailsStep';
import DialColorStep from '../StepContent/DialColorStep';
import OverviewStep from '../StepContent/OverviewStep';
import { ConfigurationFooter } from './ConfigurationFooter';

const STEP_CONTENT: Partial<Record<Step, ComponentType>> = {
  band: BandStep,
  watchCase: WatchCaseStep,
  dialDetails: DialDetailsStep,
  dialColor: DialColorStep,
  overview: OverviewStep,
};

export default function ConfigurationPanel() {

  const { currentStep, goToNextStep, goToPreviousStep } = useWatchConfig();
  const StepContent = STEP_CONTENT[currentStep];

  return (
    <article className={styles.configurationPanel} id="configuration-panel">
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