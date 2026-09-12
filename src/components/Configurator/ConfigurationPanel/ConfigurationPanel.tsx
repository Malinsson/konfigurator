import styles from './ConfigurationPanel.module.css';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { ConfigurationHeader } from './ConfigurationHeader';
import BandStep from '../StepContent/BandStep';
import DialColorStep from '../StepContent/DialColorStep';
import OverviewStep from '../StepContent/OverviewStep';
import DialDetailsStep from '../StepContent/DialDetailsStep';
import { ConfigurationFooter } from './ConfigurationFooter';

export default function ConfigurationPanel() {

  const { currentStep, goToNextStep, goToPreviousStep } = useWatchConfig();

  return (
    <article className={styles.configurationPanel}>
      <div className={styles.container}>

        <ConfigurationHeader />

        {currentStep === 'band' && <BandStep />}
        {currentStep === 'dialColor' && <DialColorStep />}
        {currentStep === 'dialDetails' && <DialDetailsStep />}
        {currentStep === 'overview' && <OverviewStep />}

        <ConfigurationFooter
          currentStep={currentStep}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
        />
      </div>
    </article>
  );
}