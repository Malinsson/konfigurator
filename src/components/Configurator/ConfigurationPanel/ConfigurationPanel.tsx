import styles from './ConfigurationPanel.module.css';
import { NavigationButton } from '../StepNavigation/NavigationButton';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { ConfigurationHeader } from './ConfigurationHeader';
import BandStep from '../StepContent/BandStep';
import DialColorStep from '../StepContent/DialColorStep';
import OverviewStep from '../StepContent/OverviewStep';
import DialDetailsStep from '../StepContent/DialDetailsStep';

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

        <div className={styles.stepFooter}>
          <NavigationButton stepDirection="back" isActive={currentStep !== 'band'} onClick={goToPreviousStep} />
          <NavigationButton stepDirection="next" isActive={currentStep !== 'overview'} onClick={goToNextStep} />
        </div>
      </div>
    </article>
  );
}