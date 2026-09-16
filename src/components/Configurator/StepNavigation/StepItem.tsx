import styles from './StepItem.module.css';
import { forwardRef } from 'react';

export const StepItem = forwardRef<HTMLDivElement, { step: string; isActive: boolean }>(
  ({ step, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.step} ${isActive ? '' : styles.stepInactive}`}
        role="tab"
        aria-selected={isActive}
        aria-label={`Step: ${step}`}
      >
        {step}
      </div>
    );
  }
);