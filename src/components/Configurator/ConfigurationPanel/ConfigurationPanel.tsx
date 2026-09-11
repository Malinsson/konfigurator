import styles from './ConfigurationPanel.module.css';
import { NavigationButton } from '../StepNavigation/NavigationButton';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import DialDetailsStep from '../StepContent/DialDetailsStep';

export default function ConfigurationPanel() {
  const { currentStep, goToNextStep, goToPreviousStep } = useWatchConfig();

  return (
    <div className={styles.configurationPanel}>
      {/* <h2>Configuration Panel</h2> */}
      {/* Add your configuration options here */}
      <DialDetailsStep />
      
      <NavigationButton stepDirection="back" isActive={currentStep !== 'band'} onClick={goToPreviousStep} />
      <NavigationButton stepDirection="next" isActive={currentStep !== 'overview'} onClick={goToNextStep} />
    </div>
  );
}