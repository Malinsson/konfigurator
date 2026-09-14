import type { StepName } from '../../../context/WatchConfigContext';
import styles from './StepBar.module.css';
import { StepItem } from './StepItem';
import { useRef, useState, useEffect } from 'react';

type Steps = Omit<StepName, 'start'>; // Exclude 'start' from the steps

export const STEP_NAMES: Steps = {
  band: '1. Strap',
  dialColor: '2. Dial Color',
  dialDetails: '3. Dial Style & Detail',
  overview: '4. Overview'
};

export function StepBar({currentStep}: {currentStep: string | undefined}) {
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(0);
  const [lineLeft, setLineLeft] = useState(0);

  // Calculate the index of the active step for the indicator
  const activeStep = Object.keys(STEP_NAMES).findIndex((step) => step === currentStep);

  // Update line width and position when active step changes
  useEffect(() => {
    const activeStepKey = Object.keys(STEP_NAMES)[activeStep];
    const activeStepElement = stepRefs.current[activeStepKey];
    const container = containerRef.current;

    if (activeStepElement && container) {
      // Get text width and make line slightly smaller (90% of text width)
      const textWidth = activeStepElement.offsetWidth;
      setLineWidth(textWidth * 0.9);

      // Calculate the center position of the active step
      const containerRect = container.getBoundingClientRect();
      const stepRect = activeStepElement.getBoundingClientRect();
      const stepCenterRelativeToContainer = stepRect.left - containerRect.left + stepRect.width / 2;
      const lineLeftPosition = stepCenterRelativeToContainer - (textWidth * 0.9) / 2;

      setLineLeft(lineLeftPosition);
    }
  }, [activeStep]);

  const indicatorStyle = {
    width: `${lineWidth}px`,
    left: `${lineLeft}px`,
    transition: 'left 0.4s ease, width 0.4s ease'
  };

  return (
    <div className={styles.stepBar} ref={containerRef}>

      <div className={styles.stepBarLine} style={indicatorStyle}></div>

      {Object.entries(STEP_NAMES).map(([step, name]) => (
        <StepItem
          key={step}
          step={name}
          isActive={currentStep === step || currentStep === 'start'}
          ref={(el: HTMLDivElement | null) => {
            if (el) stepRefs.current[step] = el;
          }}
        />
      ))}

    </div>
  );
}